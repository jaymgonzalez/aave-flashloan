// v3: router 0xE592427A0AEce92De3Edee1F18E0157C05861564
const hre = require('hardhat')

const router = '0xE592427A0AEce92De3Edee1F18E0157C05861564'

async function main() {
  console.log('deploying...')
  const Swap = await hre.ethers.getContractFactory('Swap')
  const swap = await Swap.deploy(router)

  await swap.deployed()

  console.log('swap contract deployed:', swap.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// goerli address
// 0x745F88a8b011607005E3648Cb37a42C569541049
