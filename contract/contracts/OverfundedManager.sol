// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./PropertyManager.sol";

contract OverfundedManager is Ownable {
    address public master;
    PropertyManager public propertyManager;

    mapping(address => bool) admins;

    modifier onlyAdmins() {
        require(admins[msg.sender] == true, "You are not an admin");
        _;
    }
    modifier onlyMaster() {
        require(master == msg.sender, "You are not the master");
        _;
    }

    constructor(ERC20 erc20) {
        master = msg.sender;
        admins[master] = true;
        PropertyManager _propertyManager = new PropertyManager(erc20);
        propertyManager = _propertyManager;
    }

    function addAdmin(address _admin) public onlyOwner {
        admins[_admin] = true;
    }

    function removeAdmin(address _admin) public onlyOwner {
        admins[_admin] = false;
    }

    function withdraw(uint256 _property) public {
        Property memory property = propertyManager.getProperty(_property);

        require(
            (property.owner == msg.sender || admins[msg.sender] == true),
            "Only the management and owners can withdraw funds"
        );

        propertyManager.withdrawPropertyFund(_property);
    }

    function verifyProperty(uint256 _property) external onlyAdmins {
        propertyManager.verifyProperty(_property);
    }
}
