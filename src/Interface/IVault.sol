// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IVault {


   function stake(uint256 amount, address staker) external;

   function tipCreator(uint256 amount, address _Tipper, address _creator) external;

   function subscribe(uint256 amount, address _subscriber, address _creator) external; 

   function withdrawStake(uint256 amount, address _staker) external; 

   function CreatorPayout(uint256 amount, address _creator) external;

}