// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CCP.sol";
import "./Token.sol";
import "./Vault.sol";
import "./Authorization.sol";
import "./Subscription.sol";

contract ContentDAO {
    CCP public ccpContract;
    Token public tokenContract;
    Vault public vaultContract;
    Authorization public authorizationContract;
    Subscription public subscriptionContract;

    mapping(address => MemberInfo) public memberInfo;
    mapping(address => bool) public members;
    uint256 public minimumStake;
    uint256 public memberCount;

    uint256 public numProposals;
    mapping(uint256 => Proposal) public proposals;

    struct MemberInfo {
        uint256 stakeAmount;
        uint256 lockPeriod; // in seconds
        uint256 joinedAt;
    }

    struct Proposal {
        uint256 id;
        string name;
        string description;
        uint256 duration; // in seconds
        uint256 voteCountYes;
        uint256 voteCountNo;
        bool executed;
        mapping(address => bool) hasVoted;
        uint256 startTime; // timestamp when the proposal was created
    }

    event ProposalCreated(uint256 id, string name, string description);
    event VoteCast(uint256 proposalId, bool inFavor, address voter, uint256 votingPower);
    event ProposalExecuted(uint256 id);
    event MemberJoined(address member, uint256 stakeAmount);
    event MemberLeft(address member, uint256 unstakeAmount);

    modifier onlyRegisteredUsers() {
        require(authorizationContract.registeredUsers(msg.sender), "User is not registered");
        _;
    }

    modifier onlySubscribedUsers() {
        require(subscriptionContract.isSubscribed(msg.sender) && subscriptionContract.subscriptionExpiry(msg.sender) >= block.timestamp, "User is not subscribed");
        _;
    }

    modifier onlyMembers() {
        require(members[msg.sender], "Only members can perform this action");
        _;
    }

    constructor(
        address _ccpContract,
        address _tokenContract,
        uint256 _minimumStake,
        address _vaultAddress,
        address _authorizationAddress,
        address _subscriptionAddress
    ) {
        ccpContract = CCP(_ccpContract);
        tokenContract = Token(_tokenContract);
        minimumStake = _minimumStake;
        vaultContract = Vault(_vaultAddress);
        authorizationContract = Authorization(_authorizationAddress);
        subscriptionContract = Subscription(_subscriptionAddress);
    }

    function joinDAO(uint256 stakeAmount, uint256 lockPeriod) public onlyRegisteredUsers onlySubscribedUsers {
        require(!members[msg.sender], "Already a member");
        require(stakeAmount >= minimumStake, "Stake amount too low");
        require(tokenContract.approve(address(vaultContract), stakeAmount), "Token approval failed");
        vaultContract.stake(stakeAmount, msg.sender);
        memberInfo[msg.sender] = MemberInfo(stakeAmount, lockPeriod, block.timestamp);
        members[msg.sender] = true;
        memberCount++;
        emit MemberJoined(msg.sender, stakeAmount);
    }

    function withdrawStake() public onlyMembers {
        MemberInfo storage info = memberInfo[msg.sender];
        require(info.stakeAmount > 0, "No staked tokens");
        require(block.timestamp >= info.joinedAt + info.lockPeriod, "Lock period not over");

        vaultContract.withdrawStake(info.stakeAmount, msg.sender);
        members[msg.sender] = false;
        memberCount--;
        delete memberInfo[msg.sender];
        emit MemberLeft(msg.sender, info.stakeAmount);
    }

    function leaveDAO() public onlyMembers {
        MemberInfo storage info = memberInfo[msg.sender];
        if (block.timestamp >= info.joinedAt + info.lockPeriod) {
            vaultContract.withdrawStake(info.stakeAmount, msg.sender);
            members[msg.sender] = false;
            memberCount--;
            delete memberInfo[msg.sender];
            emit MemberLeft(msg.sender, info.stakeAmount);
        } else {
            revert("Lock period not over");
        }
    }

    function createProposal(string memory name, string memory description, uint256 duration) public onlyRegisteredUsers onlySubscribedUsers onlyMembers returns (uint256) {
        Proposal storage newProposal = proposals[numProposals];
        newProposal.id = numProposals;
        newProposal.name = name;
        newProposal.description = description;
        newProposal.duration = duration;
        newProposal.voteCountYes = 0;
        newProposal.voteCountNo = 0;
        newProposal.executed = false;
        newProposal.startTime = block.timestamp;
        emit ProposalCreated(numProposals, name, description);
        numProposals++;
        return numProposals - 1;
    }

    function voteProposal(uint256 proposalId, bool inFavor) public onlyMembers {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal has already been executed");
        require(block.timestamp < proposal.startTime + proposal.duration, "Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        uint256 votingPower = memberInfo[msg.sender].stakeAmount;
        if (inFavor) {
            proposal.voteCountYes += votingPower;
        } else {
            proposal.voteCountNo += votingPower;
        }
        proposal.hasVoted[msg.sender] = true;

        emit VoteCast(proposalId, inFavor, msg.sender, votingPower);
    }

    function voteForProposal(uint256 proposalIndex) public onlyMembers {
        voteProposal(proposalIndex, true);
    }

    function voteAgainstProposal(uint256 proposalIndex) public onlyMembers {
        voteProposal(proposalIndex, false);
    }

    function executeProposal(uint256 proposalId) public onlyMembers {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal has already been executed");
        require(block.timestamp >= proposal.startTime + proposal.duration, "Voting period is not over");
        require(proposal.voteCountYes > proposal.voteCountNo, "Proposal did not pass");

        // Execute proposal logic here
        string memory description = proposal.description;
        if (keccak256(bytes(description)) == keccak256(bytes("Change user state variables"))) {
            // Modify user state variables
            // Example: ccpContract.updateUserVariables(address, ...);
        } else if (keccak256(bytes(description)) == keccak256(bytes("Delete content"))) {
            // Delete content
            // Example: ccpContract.deleteContent(uint256);
        } else if (keccak256(bytes(description)) == keccak256(bytes("Ban user"))) {
            // Ban user
            // Example: ccpContract.banUser(address);
        } else if (keccak256(bytes(description)) == keccak256(bytes("Unban user"))) {
            // Unban user
            // Example: ccpContract.unbanUser(address);
        } else if (keccak256(bytes(description)) == keccak256(bytes("Update minimum stake"))) {
            // Update minimum stake
            updateMinimumStake(parseStakeAmount(description));
        }

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

 function getProposal(uint256 proposalIndex) public view returns (ProposalView memory) {
    Proposal storage proposal = proposals[proposalIndex];
    uint256 timeLeft = proposal.startTime + proposal.duration > block.timestamp ? proposal.startTime + proposal.duration - block.timestamp : 0;
    return ProposalView({
        name: proposal.name,
        description: proposal.description,
        status: proposal.executed
            ? ProposalStatus.Executed
            : (proposal.voteCountYes > proposal.voteCountNo
                ? ProposalStatus.Approved
                : ProposalStatus.Rejected),
        timeLeft: timeLeft,
        voteCountYes: proposal.voteCountYes,
        voteCountNo: proposal.voteCountNo,
        totalVotes: proposal.voteCountYes + proposal.voteCountNo,
        executed: proposal.executed
    });
}

function getProposalCount() public view returns (uint256) {
    return numProposals;
}

function updateMinimumStake(uint256 newStake) private {
    minimumStake = newStake;
}

function parseStakeAmount(string memory description) private pure returns (uint256) {
    // Implement logic to parse the stake amount from the description string
    // Return the parsed stake amount
}

enum ProposalStatus {
    Pending,
    Approved,
    Rejected,
    Executed
}

struct ProposalView {
    string name;
    string description;
    ProposalStatus status;
    uint256 timeLeft;
    uint256 voteCountYes;
    uint256 voteCountNo;
    uint256 totalVotes;
    bool executed;
}
}
