// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./FundStorage.sol"; 


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