// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Token.sol";
import "../src/Subscription.sol";
import "../src/CCP.sol";
import "../src/Authorization.sol";
import "../src/Vault.sol";
import "../src/Analytics.sol";


contract TestAuthorization is Test {
    Authorization public authorization;

    function setUp() public {
        authorization = new Authorization();
    }

    function testUserRegistration() public {
        // Define test variables
        string memory username = "CreatorUser";
        string memory profileImage = "https://example.com/image.png";
        
        // Register the user
        authorization.registerUser(username, profileImage);

        // Check if the user is registered
        bool isRegistered = authorization.checkRegisteredUsers(address(this));
        assertTrue(isRegistered, "User should be registered");

        // Verify user details
        (string memory fetchedUsername, address walletAddress, string memory fetchedProfileImage) = 
            authorization.getUserDetails(address(this));
        
        assertEq(fetchedUsername, username, "Username should match");
        assertEq(walletAddress, address(this), "Wallet address should match");
        assertEq(fetchedProfileImage, profileImage, "Profile image should match");
    }
    
    function testUserAlreadyRegistered() public {
        // Register the user first
        string memory username = "CreatorUser";
        string memory profileImage = "https://example.com/image.png";
        authorization.registerUser(username, profileImage);
        
        // Try registering again
        vm.expectRevert("User is already registered");
        authorization.registerUser(username, profileImage);
    }
}

contract TestToken is Test {
    Token public token;

    // Setup function to deploy the Token contract before each test
    function setUp() public {
        token = new Token("TestToken", "TTK");
    }

    // Test case to verify the initial total supply and owner balance
    function testInitialTotalSupplyAndOwnerBalance() public {
        uint256 expectedTotalSupply = 1000000000 * 10 ** 18; // 1 billion tokens
        uint256 ownerBalance = token.balanceOf(address(this));

        assertEq(token.totalSupply(), expectedTotalSupply, "Total supply should be 1 billion tokens");
        assertEq(ownerBalance, expectedTotalSupply, "Owner should have the total supply");
    }

    // Test case to verify the minting functionality
    function testMinting() public {
        address recipient = address(0x123);
        uint256 mintAmount = 500 * 10 ** 18; // 500 tokens

        // Mint tokens to the recipient
        token.mint(recipient, mintAmount);

        // Verify the recipient's balance
        assertEq(token.balanceOf(recipient), mintAmount, "Recipient should have received minted tokens");
    }
}

contract CCPTest is Test {
    CCP ccp;
    address authorization = address(1); // Mock authorization contract
    address analytics = address(2); // Mock analytics contract
    address subscription = address(3); // Mock subscription contract
    address creator = address(4); // Mock creator

    function setUp() public {
        // Deploy CCP contract with mock contract addresses
        ccp = new CCP(authorization, analytics, subscription);
    }

    function testCreateFreeContent() public {
        // Mock the authorization contract to always return true for user registration
        vm.mockCall(authorization, abi.encodeWithSignature("checkRegisteredUsers(address)", creator), abi.encode(true));

        // Prank the msg.sender to simulate the creator calling the function
        vm.prank(creator);

        // Create free content
        ccp.createFreeContent("Sample Title", "QmHash", "video", "creatorUsername", "creatorImage");

        // Fetch all free content and verify the first entry
        CCP.ContentItem[] memory freeContent = ccp.fetchFreeContent();
        assertEq(freeContent[0].title, "Sample Title");
        assertEq(freeContent[0].creator, creator);
        assertEq(freeContent[0].ipfsHash, "QmHash");
    }
}