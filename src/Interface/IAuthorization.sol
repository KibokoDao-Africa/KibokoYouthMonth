// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAuthorization {
    struct User {
        string username;
        address walletAddress;
        string profileImage;
    }

    // Get user details
    function getUserDetails(address _userAddress) external view returns (string memory, address, string memory);

    function checkRegisteredUsers(address _user) external view returns(bool);
}