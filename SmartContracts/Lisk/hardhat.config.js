require("@nomicfoundation/hardhat-toolbox");                                                                          hardhat.config.js                                                                                     require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();

const evm_priv_key =  Buffer.from(process.env.PRIVATE_KEY, 'hex');
module.exports = {
  solidity: "0.8.24",
  networks: {
    // for testnet
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": process.env.LINK_SEPOLIA_API
    },
    customChains: [
      {
          network: "lisk-sepolia",
          chainId: 4202,
          urls: {
              apiURL: "https://sepolia-blockscout.lisk.com/api",
              browserURL: "https://sepolia-blockscout.lisk.com"
          }
      }
    ]
  },
  sourcify: {
    enabled: false
  },
};