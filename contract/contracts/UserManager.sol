// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


struct UserFunding{
    uint256 timestamp;
    uint256 amount;
    uint256 property;
}

struct User {
    uint256 assetsFunded;
    string username;
    UserFunding[] fundings;
}

contract UserManager {
    mapping(address => User) public users;

    function getUser(address _user) public view returns (User memory) {
        User memory user = users[_user];

        return user;
    }

    function setUsername(address _user, string calldata _username) external {
        require(
            msg.sender == _user,
            "You have no authority to set another users username"
        );
        users[_user].username = _username;
    }


    function addNewUserFunding(address _user, uint256 _property, uint256 _amount) external {
        UserFunding memory funding = UserFunding(block.timestamp, _amount, _property);
        users[_user].fundings.push(funding);
    }

    function getUserFundingPaginated(address _user,uint256 _offset, uint256 _limit) external view returns (UserFunding[] memory, uint256, uint256 ){
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
