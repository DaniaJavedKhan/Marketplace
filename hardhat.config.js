require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectID = "2ElNlzec6kFc8tmFLyWaWSTgXCS"

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectID}`,
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
