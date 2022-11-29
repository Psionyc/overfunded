// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FundStorage is Ownable {
    mapping(address => uint256) public fundings;
    uint256 public maxFunding;
    uint256 public totalFunding;
    uint256 public BPS_DECIMAL = 18;
    uint256 public profit;
    ERC20 token;
    mapping(address => uint256) public profitsRemoved;

    constructor(uint256 _price, ERC20 _token) {
        maxFunding = _price;
        token = _token;
    }

    function _getUserShare(address _user) internal view returns (uint256) {
        uint256 userAmount = fundings[_user];
        return (userAmount * 10 ** BPS_DECIMAL) / maxFunding;
    }

    function createFunding(address _funder, uint256 _amount) external {
        totalFunding += _amount;
        fundings[_funder] += _amount;
    }

    function withdrawFunds(address _to) external onlyOwner returns (bool) {
        require(maxFunding >= totalFunding, "Funding is not complete");
        bool sent = token.transfer(_to, token.balanceOf(address(this)));
        require(sent, "Withdrawal was unsuccessful");

        return sent;
    }

    function withdrawProfits(address _user) external onlyOwner {
        require(profit > 0, "No profits yet");
        uint256 withdrawnFrom = profitsRemoved[_user];
        uint256 withdrawableProfit = profit - withdrawnFrom;
        require(withdrawableProfit > 0, "You don't have an allocated profit");
        profitsRemoved[_user] += profit;
        uint256 share = _getUserShare(_user);
        uint256 userProfit = (share * withdrawableProfit) / 10 ** BPS_DECIMAL;
        bool sent = token.transfer(_user, userProfit);
        require(sent, "Withdrawal falied");
    }

    function getWithdrawableProfits(
        address _user
    ) external view returns (uint256) {
        uint256 withdrawnFrom = profitsRemoved[_user];
        uint256 withdrawableProfit = profit - withdrawnFrom;
        uint256 share = _getUserShare(_user);
        uint256 userProfit = (share * withdrawableProfit) / 10 ** BPS_DECIMAL;
        return userProfit;
    }

    function addProfit(uint256 _profit) external onlyOwner returns (bool) {
        profit += _profit;
        return true;
    }

    function balance() view external returns (uint256){
        return token.balanceOf(address(this));
    }

    function getUserShare(address _user) external view returns (uint256) {
        return _getUserShare(_user);
    }

    function collapse(address _to) external onlyOwner {
        token.transfer(_to, token.balanceOf(address(this)));
    }
}
