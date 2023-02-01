const hre = require('hardhat')
// ETH GOERLI
const IPoolAddress = '0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D'

// ARBITRUM
// const IPoolAddress = '0xC911B590248d127aD18546B186cC6B324e99F02c'

async function main() {
  console.log('deploying...')
  const FlashLoan = await hre.ethers.getContractFactory('FlashLoan')
  const flashLoan = await FlashLoan.deploy(IPoolAddress)

  await flashLoan.deployed()

  console.log('Flash loan contract deployed: ', flashLoan.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
