// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Analytics} from "../src/Analytics.sol";
import {Authorization} from "../src/Authorization.sol";
import {Token} from "../src/Token.sol";
import {Subscription} from "../src/Subscription.sol";
import {CCP} from "../src/CCP.sol";
import {Vault} from "../src/Vault.sol";

contract CCPScript is Script {

    address analytics = 0x8Ac8470Ba86dC32027050b159E050870Bc488811;
    address authorization = 0xfb9516Ea76d38a5C28984F95b7f73D2E6361C2eB;
    address token = 0x24809153438340Db7C0B1a94C6030Cc88AE7B1d7;

    Subscription public dSubscription;
    CCP public dCCP;
    Vault public dVault;

    function setUp() public {}

    function run() public {
        uint privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        dVault = new Vault(token);
        dSubscription = new Subscription(token, address(dVault), authorization);    
        dCCP = new CCP(authorization, analytics, address(dSubscription));
        vm.stopBroadcast();
    }
}