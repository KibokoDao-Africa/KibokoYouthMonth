// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Authorization {
    struct User {
        string username;
        address walletAddress;
        string profileImage;
    }

    uint256 userCount;
    mapping(address => User) public userDetails;
    mapping(address => bool) public registeredUsers;
    mapping(string => address) public usernameAddressTracker;
    mapping(address => uint256) public userIndexTracker;

    User[] public registeredUsersArray; 

    event UserRegistered(address indexed user, string username, string profileImage);
    event ProfileEdited(address indexed user, string profileImage);

    // Modifier to check if user is registered
    modifier onlyRegistered() {
        require(registeredUsers[msg.sender], "User is not registered");
        _;
    }

    // Register user with their wallet address, username, and profileImage
    function registerUser(string memory _username, string memory _profileImage) public {
        require(!registeredUsers[msg.sender], "User is already registered");
        require(usernameAddressTracker[_username] == address(0), "Username is already taken");
        
        User memory newUser = User({
            username: _username,
            walletAddress: msg.sender,
            profileImage: _profileImage
        });

        userDetails[msg.sender] = newUser;
        registeredUsers[msg.sender] = true;
        registeredUsersArray.push(newUser);
        userIndexTracker[msg.sender] = userCount;
        usernameAddressTracker[_username] = msg.sender;
        
        emit UserRegistered(msg.sender, _username, _profileImage);

        userCount++;
    }

    // Get user details
    function getUserDetails(address _userAddress) public view returns (string memory, address, string memory) {
        User memory user = userDetails[_userAddress];
        return (user.username, user.walletAddress, user.profileImage);
    }

    // Get user address by username
    function getUserAddress(string memory _username) public view returns (address) {
        return usernameAddressTracker[_username];
    }

    // Get all registered users
    function getAllUsers() public view returns (User[] memory) {
        return registeredUsersArray;
    }

    // Edit creator profile
    function editProfile(string memory _newProfileImage) public onlyRegistered {
        User storage user = userDetails[msg.sender];

        user.profileImage = _newProfileImage;
        
        registeredUsersArray[userIndexTracker[msg.sender]].profileImage = _newProfileImage;
        
        emit ProfileEdited(msg.sender, _newProfileImage);
    }

    function checkRegisteredUsers(address _user) external view returns(bool){
        return registeredUsers[_user];
    }
}