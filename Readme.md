
# Overfunded Project

## Stack
- Vue (Frontend)
- Ethers js (Contact Interaction)
- Hardhat (Contract Devlopment)

## Use of Product
The average person wants to own propetries that yield profits but they probably don't have a million to throw around but they can start with a thousand... This product (MVP) allows users to own shares of real life products with blockchain proof and get profits when the property yields profit...
>> Help on using the frontend and contract are documented in  

## Brief Description
Overfunded is a next-gen incentivized crowdfunding system that allows owning real life properties with blockchain proof while ensuring their funds are secured;

## Major Contracts and Functionalities
- ERC720i.sol
- FundStroage.sol
- Managable.sol
- ONFT.sol
- OUSD.sol
- PropertyManager.sol
- PropertyStorage.sol
- Resources.sol
- UserManager.sol  

  
  
  
#### **ERC720i.sol**:
One of my major 'offs' with the current ERC20 implementation was that to use an icon you had to login into polygonscan which made it feel less decentralized... The ERC720i implementation allows you to create tokens and keep the icons on chain...

#### **FundStorage.sol**:
This contract controls storage of funds by the users and withdrawals... It is majorly controlled by the parent contract the ___PropertyManager___

#### **Manageable.sol**:
Manageable is an abstract contract that controls functionality of having admins that control certain functions and an overall master

#### **ONFT.sol**:
ONFT which is short for *OverfundedNFT* is just a NFT to hold once a property is purchased...
>> **Note**: The functionality of this contract is limited since there is no actual backend 

#### **OUSD.sol**:
OUSD  is short for *OverfundedUSD*. It is an ERC20 token which is the currency that powers the Overfunded Ecosystem

#### **PropertyManager.sol**:
PropertyManager is the major contract that controls most of the Overfunded Ecosystem from the payments to fetching property data and property creation

#### **PropertyStorage.sol**:
A child contract that helps the *PropertyManager* to store it's properties and to abstract some code from it...

#### **Resources.sol**:
Contains all the structs used in all other contracts for cleaner code

#### **UserManager.sol**:
Used to store user data and keep track of properties that users have funded


## Credits
- [Web3 Club](https://www.youtube.com/@Web3_Club)
- [Smart Contract Programmer](https://www.youtube.com/@smartcontractprogrammer)
- [Eat the Blocks](https://www.youtube.com/@EatTheBlocks)
- https://ethereum.stackexchange.com/
- https://unsplash.com/

## Contract Development Challenges
Challenges I faced during the contract development process are:
- Hardhat node
- Storage vs Memory
- Percentage Calculation
- Approve and TransferFrom


**Hardhat Node**: This is probably the most daunting error of the entire development process... The error makes it that calls made to a smart contract are unidentified... The easiest solution is to move to a cloud network like polygon mainnet or mumbai  testnet [(Solution Link)](https://ethereum.stackexchange.com/questions/124235/providererror-error-transaction-reverted-function-selector-was-not-recognized)

**Storage vs Memory**: During contract development it occurred to me that some specific data on the contract wasn't updating and after a few hours of research I found out that storage is to be used instead of memory.Memory duplicates the data while storage points to the original data 


**Percentage Calculation**: It's not quite easy to calculate percentages in solidity because it doesn't support decimals. The solution to this was to use something called a bps in which percentages can be calculated by using a value such as 10000 or above... In my case I used 1x 10^18 as the shares in such an app needed to be precise to avoid profit loses...[(Solution Link)](https://www.youtube.com/watch?v=nsf46dzgCog)

**Approve and TransferFrom**: One of the other errors that I made was to assume that it was possible to approve and transfer in the same contract function... There were two solutions in this case.
1. Use the ERC777 contract [ERC77](https://docs.openzeppelin.com/contracts/4.x/erc777)
2. Use the ERC20 and call two separate functions.  
     I went with the second option since the ERC777 contract isn't very vast at the momen, changing to the ERC777 standard might be considered in the future

## Frontend Development Challenges
Challenges I faced during the frontend development process are:
- Hexadecimal ChainID

**Hexadecimal ChainID**: ChainIDs are naturally encoded as a decimal number on websites like https://chainlist.org but metamask requires hexadecimal chainIDs or it will throw an error

