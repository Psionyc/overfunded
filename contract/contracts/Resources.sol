// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./FundStorage.sol"; 

struct UserFundedProperty {
    uint256 id;
    string name;
    uint256 price;
    string baseImage;
}

struct UserFunding{
    uint256 timestamp;
    uint256 amount;
    UserFundedProperty property;
    uint256 id;
}

struct User {
    string username;
    UserFunding[] fundings;
    uint256 totalFunds;
    uint256 assetsFunded;
    string logoUrl;
}


enum PropertyStatus {
    FUNDING,
    FUNDED,
    FLAGGED,
    PROCESSING_PURCHASE,
    PURCHASED
}

struct Property {
    uint256 id;
    string name;
    address owner;
    uint256 price;
    uint256 funds;
    string[] images;
    FundStorage fundStorage;
    PropertyStatus status;
    bool verified;
    string location;
}