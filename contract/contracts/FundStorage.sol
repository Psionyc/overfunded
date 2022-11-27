// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FundStorage is Ownable {
    mapping(address => uint256) public fundings;
    uint256 public maxFunding;
    uint256 public totalFunding;
    ERC20 token;

    constructor(uint256 _price, ERC20 _token) {
        maxFunding = _price;
        token = _token;
    }

    function createFunding(address _funder, uint256 _amount) external {
        totalFunding += _amount;
        fundings[_funder] += _amount;
    }

    function withdraw(address _to) external onlyOwner {
        require(maxFunding >= totalFunding, "Funding is not complete");
        token.transferFrom(address(this), _to, token.balanceOf(address(this)));
    }
}
