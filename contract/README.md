# Overfunded Hardhat Project
This is a curation of the contracts in the Overfunded project



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
- Mainnet
- Testnet
- Node
  
For the 'Node' you must have a node running, boot up one by using the command below:
```shell
npx hardhat node
```


```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
