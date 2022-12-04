# Overfunded Hardhat Project
This is a curation of all the contracts used in the Overfunded project. For proper workflow; follow the instructiosn below


## Steps to take to compile and test the project
**Step 1**
```shell
npm run install
```
**Step 2**
```shell
npm run compile
```
**Step 3**
```shell
npm run test
```

## Steps to take to deploy the project
There are currently three different networks
- Mainnet (Polygon Mainnet)
- Testnet (Mumbai Testnet)
- Node (Hardhat Node)
  
For the 'Node' you must have a node running, boot up one by using the command below:
```shell
npx hardhat node
```
After all the criteria above have been fulfilled run any of the commands to target each network respectively

```shell
npm run deploy:mainnet
```
```shell
npm run deploy:testnet
```
```shell
npm run deploy:node
```

## If you need some extra functionality you can checkout some other commands
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
