// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//ERC20 with embedded svg icon urls

abstract contract ERC20i is ERC20 {
    string public icon;
    constructor(string memory _icon, string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        icon = _icon;
    }
}