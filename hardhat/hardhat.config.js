require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ''
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2 || ''
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL || ''

module.exports = {
  solidity: {
    compilers: [
      { version: '0.8.10' },
      { version: '0.8.0' },
      { version: '0.7.6' },
    ],
  },
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [PRIVATE_KEY2],
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    arbitrum: {
      url: ARBITRUM_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
}
