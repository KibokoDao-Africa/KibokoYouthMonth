# Referral Smart Contract

## Overview 🚀

The Referral Smart Contract is a decentralized referral system built on Lisk. It allows users to register with a referrer, earn rewards for referrals, and progress through levels based on their referral activity. The contract ensures fairness, enforces limits on referrals, and provides a seamless process for managing earnings and leveling up.

---

## 📋 Features

1. Registration with Referral:

Users can register with a valid referrer address.
Referrers can earn rewards for each successful registration they facilitate.

2. Referral System:

Supports tracking of direct and second-level referrals.
Limits referrers to a maximum of 9 referrals at a time.

3. Leveling Up:

Users can progress through levels by referring 9 people and paying a level-up fee.
Maximum level is capped at 10.

4. Earnings:

Referrers earn a percentage of the registration fee.
Bonus percentages are awarded for specific referral milestones.

5. Owner Functionality:

Contract owner can withdraw funds.
Owner address is set as the initial user upon deployment.

---

# Contract Details

## Constants

- REGISTRATION_FEE: 0.000000 ether (configurable).
- REFERRAL_PERCENTAGE: 70% of the registration fee.
- BONUS_REFERRALS: Every third referral grants a bonus.
- BONUS_PERCENTAGE: 50% for bonus referrals.

## Data Structures

- User:
  - referrer: Address of the user's referrer.
  - totalReferrals: Number of direct referrals.
  - level: User's current level.
  - earnings: Total earnings from referrals.
  - referredAddresses: List of direct referrals.
  - secondLevelReferrals: List of second-level referrals.

## Functions

- Public Functions

  - register(address \_referrer):
    Registers a new user with a specified referrer.

    Conditions:

    - Valid registration fee.
    - Referrer is not msg.sender or a null address.
    - Referrer has less than 9 referrals and is below level 10.

- levelUp():
  Allows a user with 9 referrals to level up by paying 0.0000005 ether.
  Conditions:

  - User must have 9 referrals.
  - User must pay the level-up fee.
  - User's level must be less than 10.

- withdraw():
  Allows the contract owner to withdraw the contract's balance.

## View Functions

- getReferredAddresses(address userAddress):
  Returns the direct referrals of a user.

- getSecondLevelReferrals(address userAddress):
  Returns the second-level referrals of a user.

- getUserBalance(address userAddress):
  Returns the total earnings of a user.

- getUserLevel(address userAddress):
  Returns the current level of a user.

- getUserReferrals(address userAddress):
  Returns the total number of referrals by a user.

- getUserReferrer(address userAddress):
  Returns the referrer address of a user.

## The project is a hybrid project. It has a web2 backend too apart from the smart contract.

- The web2 API is hosted here: https://referal-huy5.onrender.com/users/

- The front end link is: https://referal-front-end.vercel.app/

- The smart contract address is: 0x24aA197fB09477954fFdaa2C0cF5cA812d5dd000
