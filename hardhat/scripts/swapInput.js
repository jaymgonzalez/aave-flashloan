const hre = require('hardhat')
const helpers = require('@nomicfoundation/hardhat-network-helpers')

const impAddress = '0x34aA3F359A9D614239015126635CE7732c18fDF3'
const contractAddress = '0xf979fc3d161ad952a560b3eeb38DC98453e5F844'

async function main() {
  const ISwap = await hre.ethers.getContractFactory('Swap')
  console.log('Attaching...')
  const swap = await ISwap.attach(contractAddress)
  console.log('Impersonating...')

  await helpers.impersonateAccount(impAddress)
  const impersonatedSigner = await ethers.getSigner(impAddress)

  console.log(impersonatedSigner)

  const dai = await swap.DAI()

  console.log(dai)

  // .connect(impersonatedSigner)
  // .approve(swap.address, hre.ethers.utils.parseEther('100'))

  // const tx = await swap
  //   .connect(impersonatedSigner)
  //   .swapExactInputSingle(hre.ethers.utils.parseEther('100'))

  // console.log(tx)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// forked address
// 0xf979fc3d161ad952a560b3eeb38DC98453e5F844
