require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const privateKey = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {   
    lisk: {
      url: "https://rpc.lisk.io",
      accounts: [privateKey],
    },
    liskSepolia: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
