// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint256 public constant TOTAL_SUPPLY = 1000000000 * 10 ** 18;
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function totalSupply() public pure override returns (uint256) {
        return TOTAL_SUPPLY;
    }
}
