// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./FundStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./OUSD.sol";
import "./Managable.sol";
import "./UserManager.sol";
import "./Resources.sol";



contract PropertyManager is Manageable {
    Property[] private properties;
    ERC20 token;
    UserManager userManager;

    event PropertyAdded(uint256 _id);
    event PropertyRemoved(uint256 _id);
    event PropertyFlagged(uint256 _id);
    event PropertyFunded(uint256 _id);
    event PropertyVerified(uint256 _id);

    constructor(ERC20 _tokenToUse) {
        token = _tokenToUse;
    }

    function setUserManager(address _userManager) onlyMaster external {
        userManager = UserManager(_userManager);
    }

    function getAllProperties() public view returns (Property[] memory) {
        Property[] memory _properties = properties;
        return _properties;
    }

    function getProperty(
        uint256 _property
    ) external view returns (Property memory) {
        return properties[_property];
    }

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
        uint256 _lon,
        uint256 _lat
    ) public returns (Property memory) {
        FundStorage fundStorage = new FundStorage(_price, token);
        Property memory property = Property(
            properties.length,
            _name,
            msg.sender,
            _price,
            0,
            _images,
            fundStorage,
            PropertyStatus.FUNDING,
            false,
            _location,
            _lon,
            _lat
        );
        properties.push(property);
        emit PropertyAdded(property.id);
        return property;
    }

    function removeProperty(uint256 _property) public onlyAdmins {
        if (_property > properties.length) return;
        properties[_property] = properties[properties.length - 1];
        properties.pop();
    }
    //TODO get transfers working and fix user manager funding

    function fundProperty(
        uint256 _property,
        uint256 _amount
    ) external payable returns (string memory) {
        Property memory property = properties[_property];
        require(
            property.status != PropertyStatus.FUNDED,
            "This property has been fully funded"
        );

        uint256 remainingAmountToFund = property.price - property.funds;

        if (remainingAmountToFund <= _amount) {
            //Send remaining amount to fund
            bool transferred = token.transfer(
                address(property.fundStorage),
                remainingAmountToFund
            );
            require(transferred, "Your funding was unsuccessful");
            property.status = PropertyStatus.FUNDED;
            property.funds += remainingAmountToFund;
            property.fundStorage.createFunding(
                msg.sender,
                remainingAmountToFund
            );

            userManager.addNewUserFunding(msg.sender, _property, remainingAmountToFund);

        } else {
            //Send amount
            bool sent = token.transfer(
                address(property.fundStorage),
                _amount
            );
            require(sent,"Your funding wasn't successful");
            property.funds += _amount;
            property.fundStorage.createFunding(msg.sender, _amount);
            userManager.addNewUserFunding(msg.sender, _property, _amount);
        }

        return "Successfully funded a property";
    }

    function withdrawPropertyFund(uint256 _property) external payable {
        Property memory property = properties[_property];
        require(
            property.verified && property.status == PropertyStatus.FUNDED,
            "Funds can only be withdrawn when an asset is verified and fully funded"
        );

        //Send funds to msg.sender
        //Set property state to "Processing Withdrawal"
    }

    function verifyProperty(uint256 _property) external onlyAdmins {
        properties[_property].verified = true;
    }
}
