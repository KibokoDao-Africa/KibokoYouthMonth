 //const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const dotenv = require('dotenv')
const HDWalletProvider = require("truffle-hdwallet-provider");
const { MNEMONIC, INFURA_KEY } = dotenv.load().parsed

const rinkebyProvider =
  new HDWalletProvider(MNEMONIC, 'https://rinkeby.infura.io/v3/' + INFURA_KEY, 0, 10)

const ropstenProvider =
    new HDWalletProvider(MNEMONIC, 'https://ropsten.infura.io/v3/' + INFURA_KEY, 0, 10)

const mainnetProvider =
        new HDWalletProvider(MNEMONIC, 'https://mainnet.infura.io/v3/' + INFURA_KEY, 0, 10)

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
//https://rinkeby.infura.io/v3/6df9d2c434974a49af0e420cbdc4fc7a
    networks: {
      ropsten: {
        provider: () => ropstenProvider,
        network_id: 3
      },
      rinkeby: {
        provider: () => rinkebyProvider,
        network_id: 4,
        gas: 7000000,
        gasPrice: 250000000000
                //200000000000

      },
      development: {
          host: "127.0.0.1",
          port: 8545,
           gas: 6700000,
           gasPrice: 200000000000,
          network_id: "*" // Match any network id
      },
      mainnet: {
        provider: () => mainnetProvider,
        network_id: 1,
        gas: 7900000,
        gasPrice: 10000000000

      }
  },
  compilers: {
    solc: {
      version: "^0.4.23"
    }
  }
};
