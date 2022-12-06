// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Resources.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ONFT.sol";

contract UserManager {
    mapping(address => User) public users;
    OverfundedNFT onft;
    uint256 nextTokenId = 0;

    constructor() {
       onft = new OverfundedNFT();
    }

    function getUser(address _user) public view returns (User memory) {
        User memory user = users[_user];
        return user;
    }

    function setUsername(string calldata _username) external {
        users[msg.sender].username = _username;
    }

    function mintPropertyNFT(uint256 _funding, string calldata _uri) public {
        require(!users[msg.sender].fundings[_funding].property.minted, "You already minted an NFT for this property");
        onft.safeMint(msg.sender, nextTokenId, _uri);
        nextTokenId += 1;
        users[msg.sender].fundings[_funding].property.minted = true;
    }

    function addNewUserFunding(
        address _user,
        UserFundedProperty calldata _property,
        uint256 _amount
    ) external {
        UserFunding memory funding = UserFunding(
            block.timestamp,
            _amount,
            _property,
            users[_user].fundings.length
        );
        users[_user].fundings.push(funding);
        users[_user].totalFunds += _amount;
        users[_user].assetsFunded += 1;
    }

    function setUserLogo(string calldata _logoUrl) external {
        users[msg.sender].logoUrl = _logoUrl;
    }

    function getUserFundingPaginated(
        address _user,
        uint256 _offset,
        uint256 _limit
    ) external view returns (UserFunding[] memory, uint256, uint256) {
        User memory user = users[_user];
        uint256 totalFunding = user.fundings.length;
        if (_limit == 0) {
            _limit = 1;
        }
        if (_limit > totalFunding - _offset) {
            _limit = totalFunding - _offset;
        }

        if (_limit < 0) {
            return (user.fundings, 0, 0);
        }
        UserFunding[] memory values = new UserFunding[](_limit);

        for (uint i = 0; i < _limit; i++) {
            values[i] = user.fundings[_offset + i];
        }
        return (values, _offset + _limit, totalFunding);
    }
}
