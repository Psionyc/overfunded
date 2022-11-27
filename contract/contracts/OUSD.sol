// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OverfundedUSD is ERC20 {
    constructor() ERC20("Overfunded USD", "OUSD") {
        _mint(address(msg.sender), 100000000000);
        transfer(msg.sender , 100000000000);
    }

    
}
