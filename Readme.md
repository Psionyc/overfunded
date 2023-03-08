# Overfunded Project

## Stack

- Vue (Frontend)
- Ethers js (Contact Interaction)
- Hardhat (Contract Devlopment)
- Nestjs (Optional Backend)

## Use of Product

The average person wants to own propetries that yield profits but they probably don't have a million to throw into it but they can start with a thousand... This product (MVP) allows users to own shares of real life products with blockchain proof and get profits when the property yields profit...

> > **Note**: Read How to use below

## Brief Description

Overfunded is a next-gen incentivized crowdfunding system that allows owning real-life properties with blockchain proof while ensuring their funds are secured.  


## How To Use

**Step 0**:
Go to [FTM-testnet Faucet](https://https://faucet.fantom.network/) and get some Test Matic.  
**Step 1**:
Go to [Overfunded Faucet](https://overfunded.vercel.app/faucet), connect a wallet and _GET OUSD_. 

**Step 2**:
Go to [Funding Page](https://overfunded.vercel.app/fund) and you can start testing out feautures. 

**Step 3**
Check out [What to Test](https://github.com/Psionyc/overfunded/#what-to-test) to get a better understanding of everything that currently works with this release...

## What to test

**Fund Property**: On the funding page there are lots of properties you can fund if you have OUSD, Fund Away!.

**Add Property**: You can also add properties to your heart content... You can get image links from any image provider.

**Withdraw Funds**: For testing purposes the assets are set to verified automatically which allows fund withhdrawals for owners of the properties (i.e The user who initially added the property).

**Change Username**: Yes you can also change your username by clicking on your wallet address.

**Change LogoUrl:** Again if you have an image url for an avater you can also use it for your logo/avatar url.

**Mint NFT**: To prove you funded a property you have access to a mint function to get an official test nft.  
You can check all your nfts on [Opensea (Overfunded NFTs)](https://testnets.opensea.io/collection/overfundednft-sanpb3l89h)

## Rules That Govern the Overfunded Ecosystem

- Anyone can add a property
- Anyone can fund a property
- Total funds collected from user can never exceed the price of the property
- Properties can be funded till they are flagged or removed in which the funds are reimbursed. 
- Only the Overfunded administratives (In case of emergencies) and property owner can withdraw funds.
- Funds can only be withdrawn when a property is verified.
>> Note that all properties are verified by default for testing purposes.
- Anyone who funded a property can mint it's nft only once.
- Anyone can add profit to a property.
- The profits are shared between funders to a precison of 18 decimals (Instead of using decimals a BPS is used which is 10^18).
- Users can edit their profile whenever they wish but should pay attention to gas costs.
- Anyone can pick ousd(Overfunded's native currency) from the faucet for testing purposes. 

## Next Steps

- Adding UI components for adding and withdrawing profits
- Creating a voting system before withdrawing funds
- Storing user and property data off chain to reduce gas costs
- Event listeners to notify users about on-chain changes (Such as Adding Profits if possible)
- Editting metadata through a backend to show user's current share as NFTs

## My Environment
Below is a list showcasing the public environment variables used, otherwise sensitive data have been removed from the list.  

```
VITE_PROPERTY_MANAGER = "0x30D7f7879dcfa19a6C90F575D1A362a2F453bA31"
VITE_OUSD = "0xea86B425eEB889eC501107f1d5D23332d8549FED"
VITE_USER_MANAGER = "0x3884ae78b5e42c14559B7CF60bF2265CC0a49f2d"
VITE_CURRENCY_SYMBOL = "FTM"
VITE_CURRENCY_NAME = "Fantom"
VITE_NETWORK_URL  = "https://rpc.testnet.fantom.network"
VITE_CHAIN_ID = "0xfa2"
VITE_CHAIN_NAME = "Fantom Testnet"
VITE_DECIMALS = 18
VITE_BACKEND_URL = "https://api.overfunded.xyz"
```

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

One of my major 'offs' with the current ERC20 implementation was that to use an icon you had to login into ftmscan which made it feel less decentralized... The ERC720i implementation allows you to create tokens and keep the icons on chain...

#### **FundStorage.sol**:

This contract controls storage of funds by the users and withdrawals... It is majorly controlled by the parent contract the **_PropertyManager_**

#### **Manageable.sol**:

Manageable is an abstract contract that controls functionality of having admins that control certain functions and an overall master

#### **ONFT.sol**:

ONFT which is short for _OverfundedNFT_ is just a NFT to hold once a property is purchased...

> > **Note**: The functionality of this contract is limited since there is no reasonable backend

#### **OUSD.sol**:

OUSD is short for _OverfundedUSD_. It is an ERC20 token which is the currency that powers the Overfunded Ecosystem

#### **PropertyManager.sol**:

PropertyManager is the major contract that controls most of the Overfunded Ecosystem from the payments to fetching property data and property creation

#### **PropertyStorage.sol**:

A child contract that helps the _PropertyManager_ to store it's properties and to abstract some code from it...

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

**Hardhat Node**: This is probably the most daunting error of the entire development process... The error makes it that calls made to a smart contract are unidentified... The easiest solution is to move to a cloud network like ftm mainnet or FTM-testnet [(Solution Link)](https://ethereum.stackexchange.com/questions/124235/providererror-error-transaction-reverted-function-selector-was-not-recognized)

**Storage vs Memory**: During contract development it occurred to me that some specific data on the contract wasn't updating and after a few hours of research I found out that storage is to be used instead of memory.Memory duplicates the data while storage points to the original data

**Percentage Calculation**: It's not quite easy to calculate percentages in solidity because it doesn't support decimals. The solution to this was to use something called a bps in which percentages can be calculated by using a value such as 10000 or above... In my case I used 1x 10^18 as the shares in such an app needed to be precise to avoid profit loses...[(Solution Link)](https://www.youtube.com/watch?v=nsf46dzgCog)

**Approve and TransferFrom**: One of the other errors that I made was to assume that it was possible to approve and transfer in the same contract function... There were two solutions in this case.

1. Use the ERC777 contract [ERC777](https://docs.openzeppelin.com/contracts/4.x/erc777)
2. Use the ERC20 and call two separate functions.  
   I went with the second option since the ERC777 contract isn't very vast at the momen, changing to the ERC777 standard might be considered in the future

## Frontend Development Challenges

Challenges I faced during the frontend development process are:

- Vue Proxy/Reactive
- Hexadecimal ChainID
- Hexadecimal Comparism

**Vue Proxy/Reactive**: Vue core reactive elements like ref and reactive and stores do not support ethers contracts. The simples solution is to initialize contracts as mutable global variables and alter them using events

**Hexadecimal ChainID**: ChainIDs are naturally encoded as a decimal number on websites like https://chainlist.org but metamask requires hexadecimal chainIDs or it will throw an error

**Hexadecimal Comparism**: Hexadecimals can be stored in different cases therefore comparing them directly gave a bug till it was compared under the same case (i.e Lower case or Upper case). For Example 0xabcd && 0xABCD will be considered equal on-chain but different off-chain
