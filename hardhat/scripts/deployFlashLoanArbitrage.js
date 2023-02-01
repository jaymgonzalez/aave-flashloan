const hre = require('hardhat')

async function main() {
  console.log('deploying...')
  const FlashLoanArbitrage = await hre.ethers.getContractFactory(
    'FlashLoanArbitrage'
  )
  const flashLoanArbitrage = await FlashLoanArbitrage.deploy(
    '0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D'
  )

  await flashLoanArbitrage.deployed()

  console.log('Flash loan contract deployed: ', flashLoanArbitrage.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// goerli address
// 0x58eb761373F4382A100321fE0283EfF5dceeca45
