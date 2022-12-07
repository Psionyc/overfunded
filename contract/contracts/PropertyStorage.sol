// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./FundStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Managable.sol";
import "./UserManager.sol";
import "./Resources.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyStorage is Ownable {
    Property[] private properties;

    event PropertyAdded(uint256 _id);
    event PropertyRemoved(uint256 _id);

    function getProperties(
        uint _offset,
        uint _limit
    )
        public
        view
        returns (Property[] memory props, uint nextOffset, uint total)
    {
        uint totalProperties = properties.length;
        if (_limit == 0) {
            _limit = 1;
        }

        if (_limit > totalProperties - _offset) {
            _limit = totalProperties - _offset;
        }

        if (_limit < 0) {
            return (properties, 0, 0);
        }

        Property[] memory values = new Property[](_limit);

        for (uint i = 0; i < _limit; i++) {
            values[i] = properties[_offset + i];
        }

        return (values, _offset + _limit, totalProperties);
    }

    function createNewProperty(
        string calldata _name,     
        uint256 _price,
        string[] calldata _images,
        string calldata _location,
        address _owner,
        FundStorage _fundStorage
    ) public onlyOwner returns (Property memory) {
        Property memory property = Property(
            properties.length,
            _name,
            _owner,
            _price,
            0,
            _images,
            _fundStorage,
            PropertyStatus.FUNDING,
            true,
            _location
        );

        properties.push(property);
        emit PropertyAdded(property.id);
        return property;
    }

    function removeProperty(uint256 _property) public onlyOwner {
        require(_property < properties.length, "This property does not exist");
        properties[_property] = properties[properties.length - 1];
        properties.pop();
        emit PropertyRemoved(_property);
    }

    function getProperty(
        uint256 _property
    ) public view returns (Property memory) {
        require(_property < properties.length, "This propetry does not exist");
        return properties[_property];
    }

    function setProperty(
        uint256 _property,
        Property calldata value
    ) external onlyOwner {
        require(_property < properties.length, "This propetry does not exist");
        properties[_property] = value;
    }

    function flagProperty(uint256 _property) external onlyOwner {
        require(_property < properties.length, "This propetry does not exist");
        properties[_property].status = PropertyStatus.FLAGGED;
    }

    function verify(uint256 _property) external onlyOwner {
        require(_property < properties.length, "This propetry does not exist");
        properties[_property].verified = true;
    }
}
