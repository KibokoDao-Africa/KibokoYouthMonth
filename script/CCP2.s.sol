// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {CCP} from "../src/CCP.sol";

contract CCPScript is Script {
    CCP public dCCP;
    address analytics = 0x8Ac8470Ba86dC32027050b159E050870Bc488811;
    address subscription = 0xb4Ae389A2A1C29A9a302ec22C248cd9f570C2584;
    address authorization = 0xfb9516Ea76d38a5C28984F95b7f73D2E6361C2eB;

    function setUp() public {}

    function run() public {
        uint privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey); 
        dCCP = new CCP(authorization, analytics, subscription);
        vm.stopBroadcast();
    }
}