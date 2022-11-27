// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

abstract contract Manageable {
    address public master;

    mapping(address => bool) admins;

    event AdminAdded(address _admin);
    event AdminRemoved(address _admin);
    event MasterChanged(address _newMaster);

    modifier onlyAdmins() {
        require(admins[msg.sender] == true, "You are not an admin");
        _;
    }
    modifier onlyMaster() {
        require(master == msg.sender, "You are not the master");
        _;
    }

    constructor() {
        master = msg.sender;
        admins[master] = true;
    }

      function addAdmin(address _admin) public onlyMaster {
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) public onlyMaster {
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function changeMaster(address _newMaster) external {
        admins[master] = false;
        admins[_newMaster] = true;
        master = _newMaster;

        emit MasterChanged(_newMaster);
    }
}
