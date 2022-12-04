// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./FundStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Managable.sol";
import "./UserManager.sol";
import "./Resources.sol";
import "./PropertyStorage.sol";

contract PropertyManager is Manageable {
    ERC20 public token;
    UserManager userManager;
    PropertyStorage propertyStorage;

    event PropertyAdded(uint256 _id);
    event PropertyRemoved(uint256 _id);
    event PropertyFlagged(uint256 _id);
    event PropertyFunded(uint256 _id);
    event PropertyVerified(uint256 _id);
    event PropertyPurchased(uint256 _id);

    constructor(ERC20 _token, UserManager _userManager) {
        token = _token;
        userManager = _userManager;
        propertyStorage = new PropertyStorage();
    }

  

    function getProperties(
        uint _offset,
        uint _limit
    )
        public
        view
        returns (Property[] memory props, uint nextOffset, uint total)
    {
        return propertyStorage.getProperties(_offset, _limit);
    }
    
    function getProperty(uint256 _property) external view returns (Property memory){
        return propertyStorage.getProperty(_property);
    }

    function createNewProperty(
        string calldata _name,
        uint256 _price,
        string[] calldata _images,
        string calldata _location
    ) public  returns (Property memory) {
        FundStorage fundStorage = new FundStorage(_price, token);
        Property memory property = propertyStorage.createNewProperty(
            _name,
            _price,
            _images,
            _location,
            msg.sender,
            fundStorage
        );

        emit PropertyAdded(property.id);
        return property;
    }

    function removeProperty(uint256 _property) public onlyAdmins {
        propertyStorage.getProperty(_property).fundStorage.collapse(master);
        propertyStorage.removeProperty(_property);
        emit PropertyRemoved(_property);
    }

    function fundProperty(
        uint256 _property,
        uint256 _amount
    ) external returns (string memory) {
        Property memory property = propertyStorage.getProperty(_property);
        require(
            property.status != PropertyStatus.FUNDED,
            "This property has been fully funded"
        );

        require(
            property.status != PropertyStatus.FLAGGED,
            "This property has been flagged"
        );

        uint256 remainingAmountToFund = property.price - property.funds;

        if (remainingAmountToFund <= _amount) {
            
            bool transferred = token.transferFrom(
                msg.sender,
                address(property.fundStorage),
                remainingAmountToFund
            );
            require(transferred, "Your funding was unsuccessful");
            property.funds = property.funds + remainingAmountToFund;
            property.fundStorage.createFunding(
                msg.sender,
                remainingAmountToFund
            );
            property.status = PropertyStatus.FUNDED;
            if (address(userManager) != address(0))
                userManager.addNewUserFunding(
                    msg.sender,
                    UserFundedProperty(property.id, property.name, property.price, property.images[0]),
                    remainingAmountToFund
                );
        } else {
            //Send amount
            bool sent = token.transferFrom(
                msg.sender,
                address(property.fundStorage),
                _amount
            );
            require(sent, "Your funding wasn't successful");
            property.funds = property.funds + _amount;
            property.fundStorage.createFunding(msg.sender, _amount);
            if (address(userManager) != address(0))
                userManager.addNewUserFunding(msg.sender, UserFundedProperty(property.id, property.name, property.price, property.images[0]), _amount);
        }
        propertyStorage.setProperty(_property, property);
        emit PropertyFunded(_property);
        return "Successfully funded a property";
    }

    function withdrawPropertyFund(uint256 _property) external payable {
        Property memory property = propertyStorage.getProperty(_property);
        require(
            (property.verified == true &&
                property.status == PropertyStatus.FUNDED),
            "Funds can only be withdrawn when an asset is verified and fully funded"
        );
        require(msg.sender == property.owner, "Only owners can withdraw funds");

        bool sent = property.fundStorage.withdrawFunds(msg.sender);

        require(sent, "The withdrawal wasn't successful");

        property.status = PropertyStatus.PURCHASED;
        propertyStorage.setProperty(_property, property);
    }

    function flagProperty(uint256 _property) external onlyAdmins {
        propertyStorage.flagProperty(_property);
    }

    function addProfit(uint256 _property, uint256 _amount) external {
        Property memory property = propertyStorage.getProperty(_property);
        bool sent = token.transferFrom(
            msg.sender,
            address(property.fundStorage),
            _amount
        );
        require(sent, "The transfer wasn't successful");
        property.fundStorage.addProfit(_amount);
    }

    function withdrawProfits(uint256 _property) external {
        propertyStorage.getProperty(_property).fundStorage.withdrawProfits(
            msg.sender
        );
    }

    function verifyProperty(uint256 _property) external onlyAdmins {
        propertyStorage.verify(_property);
        emit PropertyVerified(_property);
    }
}
