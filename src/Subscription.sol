// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Interface/IVault.sol";
import "./Interface/IAuthorization.sol";

contract Subscription {
    IERC20 public token;
    IVault public vault;
    IAuthorization public authorizationContract;
    
    struct User {
        string username;
        address walletAddress;
    }

    mapping(address => mapping(address => bool)) public isSubscribedToCreator;
    mapping(address => mapping(address => uint256)) public subscriptionToCreatorExpiry;

    mapping(address => User[]) creatorSubscribers;
    mapping(address => User[]) SubscribedTo;

    mapping(address => uint256) public creatorSubscriptionAmount;

    mapping(address => bool) public isSubscribed;
    mapping(address => uint256) public subscriptionExpiry;

    event Subscribed(address indexed creator, address indexed subscriber, uint256 indexed  timeSubscribed, uint256 expiry);

    uint256 subscriptionBaseFee = 1e2;
    uint256 discountRate = 25;

    constructor(address _tokenAddress, address _vaultAddress, address _authorization) {
        token = IERC20(_tokenAddress);
        vault = IVault(_vaultAddress);
        authorizationContract = IAuthorization(_authorization);
    }

    function setMonthlySubscriptionAmount(uint256 _amount) public {
        creatorSubscriptionAmount[msg.sender] = _amount;
    }

    function tipCreator(address _creator, uint256 amount) public {
        vault.tipCreator(amount, msg.sender, _creator);
    }

    function fetchSubscribers(address _creator) public view returns(User[] memory) {
        return creatorSubscribers[_creator];
    }

    function fetchSubscribedTo(address _subscriber) public view returns(User[] memory) {
        return SubscribedTo[_subscriber];
    }

    function getCreatorSubscriptionAmount(address _creator) public view returns(uint256){
        return creatorSubscriptionAmount[_creator];
    }

    // Subscribe to platform using tokens
    function subscribeToCreator(address _creator, uint256 _amount) public {
        require(!isSubscribedToCreator[_creator][msg.sender] && !(subscriptionToCreatorExpiry[_creator][msg.sender] >= block.timestamp), "User is already subscribed");
        require(_amount == creatorSubscriptionAmount[_creator], "Amount doesn't match creator requirement");

        uint256 subDays = 30 days;

        isSubscribedToCreator[_creator][msg.sender] = true;
        subscriptionToCreatorExpiry[_creator][msg.sender] = block.timestamp + subDays;

        vault.subscribe(_amount, msg.sender, _creator);

        subscriptionToCreatorExpiry[_creator][msg.sender] = block.timestamp + subDays;

        (string memory subscriberUsername, address subscriberWalletAddress, ) = authorizationContract.getUserDetails(msg.sender);
        User memory subscriberUser =  User(subscriberUsername, subscriberWalletAddress);

        (string memory creatorUsername, address creatorWalletAddress, ) = authorizationContract.getUserDetails(_creator);
        User memory creatorUser =  User(creatorUsername, creatorWalletAddress);

        creatorSubscribers[_creator].push(subscriberUser);
        SubscribedTo[msg.sender].push(creatorUser);

        emit Subscribed(_creator, msg.sender, block.timestamp, subscriptionToCreatorExpiry[_creator][msg.sender]);
    }

    // Check if user is subscribed to creator
    function checkSubscribtionToCreatorStatus(address _creator, address _subscriber) public view returns (bool) {
        if (isSubscribedToCreator[_creator][_subscriber] && (subscriptionToCreatorExpiry[_creator][_subscriber] >= block.timestamp)) {
            return true;
        } else {
            return false;
        }
    }
}
