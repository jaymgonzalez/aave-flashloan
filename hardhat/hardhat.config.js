require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ''
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL || ''

module.exports = {
  solidity: '0.8.10',
  networks: {
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
