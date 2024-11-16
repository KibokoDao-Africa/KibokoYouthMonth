// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    IERC20 public token;
    mapping(address => uint256) public stakedBalances;

    uint256 public DAORewardbalance;

    uint256 public subscriptionBalances;
    mapping(address => uint256) public creatorAccured;

    event Staked(address indexed user, uint256 amount);
    event Tipped(
        address indexed creator,
        address indexed tipper,
        uint256 amount
    );
    event Subscribed(
        address indexed creator,
        address indexed subscriber,
        uint256 amount
    );
    event WithdrawnStaked(address indexed creator, uint256 amount);
    event WithdrawnAccured(address indexed creator, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function stake(uint256 amount, address staker) external {
        require(token.balanceOf(staker) >= amount, "Insufficient balance");
        token.transferFrom(staker, address(this), amount);
        stakedBalances[staker] += amount;
        emit Staked(staker, amount);
    }

    function tipCreator(
        uint256 amount,
        address _Tipper,
        address _creator
    ) public {
        require(token.balanceOf(_Tipper) >= amount, "Insufficient balance");
        token.transferFrom(_Tipper, address(this), amount);

        creatorAccured[_creator] += amount;

        emit Tipped(_creator, _Tipper, amount);
    }

    function subscribe(
        uint256 amount,
        address _subscriber,
        address _creator
    ) external {
        require(token.balanceOf(_subscriber) >= amount, "Insufficient balance");
        token.transferFrom(_subscriber, address(this), amount);

        creatorAccured[_creator] += amount;

        emit Subscribed(_creator, _subscriber, amount);
    }

    function withdrawStake(uint256 amount, address _staker) external {
        require(
            stakedBalances[_staker] >= amount,
            "Insufficient staked balance"
        );
        stakedBalances[_staker] -= amount;

        token.transfer(_staker, amount);

        emit WithdrawnStaked(_staker, amount);
    }

    function CreatorPayout(uint256 amount, address _creator) external {
        require(
            creatorAccured[_creator] >= amount,
            "Insufficient staked balance"
        );
        creatorAccured[_creator] -= amount;

        // To Do - calculation to share creator accured with DAO and developer
        token.transfer(_creator, amount);

        emit WithdrawnAccured(_creator, amount);
    }
}
