---
title: Hardhat Starter
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

:::tip 
The file is not intended to be part of the docs.
:::

This tutorial walks through the setup of a project that will run Hardhat and deploys a simple smart contract to it.

Hardhat comes built-in with Hardhat Network, a local Ethereum network designed for development. It allows for the deployment of smart contracts, running of tests and debugging code locally.

## Project Setup

To get started with Hardhat install it in a new  project directory.

- To start a new project, create a directory for it.

    ```bash
    % mkdir hardhat-tutorial && cd hardhat-tutorial
    ```

- Initialize the new project.
  
    ```bash
    % npm init -y
    ```

- To get started with Hardhat install it in the project directory.

    ```bash
    % npm install --save-dev hardhat
    ```

- Once installed, run npx hardhat. This will create a Hardhat config file (hardhat.config.js) in the project directory. When prompted select _"Create a sample project"_.

    ```bash
    # npx can run executables installed locally in a project
    % npx hardhat
    ```

## Contracts

Contracts are stored as Solidity source files (.sol) in a contracts directory. This is equivalent to the src directory from other languages.

### Create box.sol

Write a simple smart contract, called Box: it will let users store a value that can be retrieved. Save this file as contracts/Box.sol.

```js
// contracts/Box.sol
pragma solidity ^0.6.0;

contract Box {
    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

### Compile Box.sol

The Ethereum Virtual Machine (EVM) cannot execute Solidity code directly, it must be compiled into EVM bytecode. For this tutorial the Box.sol contract uses Solidity 0.7 so first configure Hardhat to use an appropriate solc version. Specify the Solidity 0.7.3 solc version in the hardhat.config.js.

```js
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
};
```

Now compile the Box.sol contract.

```bash
npx hardhat compile
Downloading compiler 0.7.3
Compiling 1 file with 0.7.3
Compilation finished successfully
```

The Hardhat command `compile` is a built-in task that automatically looks for all contracts in the contracts directory, and compiles them with the Solidity compiler using the configuration in hardhat.config.js.

A new artifacts directory was created: it holds the compiled artifacts (bytecode and metadata), which are .json files. Add this directory to your .gitignore if pushes the project to a remote repo.

## Deploying

Unlike most software, smart contracts don’t run on a computer or a server: they live on the Ethereum network itself. This means that interacting with them is a bit different from more traditional applications.

### Setup a Local Blockchain

A local blockchain runs on a local machine, requires no Internet access, provides all the Ether needed, and mines blocks instantly. These reasons also make local blockchains a great fit for automated tests.

Hardhat comes with a local blockchain built-in, the Hardhat Network. Upon startup, Hardhat Network will create a set of unlocked accounts and give them Ether.

```bash
% npx hardhat node
```
Hardhat Network will print out its address, `http://127.0.0.1:8545`, along with a list of available accounts and their private keys.

Keep in mind that every time you run Hardhat Network, it will create a brand new local blockchain - the state of previous runs is not preserved. This is fine for short-lived experiments, but it means that you will need to have a window open running Hardhat Network for the duration of this tutorial.

### Deploy Box.sol

Hardhat doesn’t currently have a native deployment system, instead use scripts to deploy contracts. Create a script to deploy the Box contract. Save this file as scripts/deploy.js

```js
// scripts/deploy.js
require('@nomiclabs/hardhat-ethers');

async function main() {
  // Get the contract to deploy
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box...");
  const box = await Box.deploy();
  await box.deployed();
  console.log("Box deployed to:", box.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Using the run command, deploy the Box contract to the local Hardhat network.

Hardhat doesn’t keep track of deployed contracts. Note the deployed address from the script below. This will be useful when interacting with the contract programmatically.

```bash
% npx hardhat run --network localhost scripts/deploy.js
Deploying Box...
Box deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Console Interaction

Use the Hardhat console to interact with the deployed Box contract on the localhost Hardhat network.

```bash
$ npx hardhat console --network localhost

# Load the Box contract definition.
> const Box = await ethers.getContractFactory("Box")

# Attach to Box, use the address from the deployment script shown above.
> const box = await Box.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")

# View the functions in box
> box.interface.functions

# Tell the contract to store 99 in integer value stored in the contract.
> await box.store(99)

# Call retrieve, it returns the integer value stored in the contract. This is a query of blockchain state, so we don’t need to send a transaction.
> await box.retrieve()
BigNumber { _hex: '0x2a', _isBigNumber: true }

# Display the big number as a string.
> (await box.retrieve()).toString()
'99'
```
