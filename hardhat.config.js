require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-web3");

const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectID = "2EtS0c8PKz8xwB9E1QejDihdvqk"

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    // rinkeby:{
    //   url: `https://rinkeby.arbitrum.io/rpc`,
    //   accounts: [privateKey],
    // },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [privateKey],
      allowUnlimitedContractSize: true,
    },
    mainnet:{
      url: `https://polygon-mainnet.infura.io/v3/${projectID}`,
      accounts: [privateKey],
      allowUnlimitedContractSize: true,
    }
  },
  solidity: "0.8.9",
};
