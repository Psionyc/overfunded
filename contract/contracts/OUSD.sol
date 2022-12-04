// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./ERC20i.sol";

contract OverfundedUSD is ERC20i {
    constructor() ERC20i("https://icon.com", "Overfunded USD", "OUSD") {
        _mint(address(msg.sender), 1_000_000_000 * 10 ** uint256(decimals()));
    }

    //Using 0 decimals for project simplicity

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function requestTokens() public {
        _mint(address(msg.sender), 100_000 * 10 ** uint256(decimals()));
    }
}
