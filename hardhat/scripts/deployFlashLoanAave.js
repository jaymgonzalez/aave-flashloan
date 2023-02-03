const hre = require('hardhat')
// Arbitrum
const providerAddress = '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb'
const swapAddress = '0xE9061F92bA9A3D9ef3f4eb8456ac9E552B3Ff5C8'

async function main() {
  console.log('deploying...')
  const FlashLoanArbitrage = await hre.ethers.getContractFactory(
    'AaveFlashLoan'
  )
  const flashLoanArbitrage = await FlashLoanArbitrage.deploy(
    providerAddress,
    swapAddress
  )

  await flashLoanArbitrage.deployed()

  console.log('Flash loan contract deployed:', flashLoanArbitrage.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// goerli address
// 0x58eb761373F4382A100321fE0283EfF5dceeca45
