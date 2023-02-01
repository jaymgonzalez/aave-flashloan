const hre = require('hardhat')

async function main() {
  console.log('deploying...')
  const Dex = await hre.ethers.getContractFactory('Dex')
  const dex = await Dex.deploy()

  await dex.deployed()

  console.log('Dex contract deployed: ', dex.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// goerli address
// 0x745F88a8b011607005E3648Cb37a42C569541049
