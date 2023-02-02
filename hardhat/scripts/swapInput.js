const hre = require('hardhat')
const helpers = require('@nomicfoundation/hardhat-network-helpers')

const impAddress = '0x34aA3F359A9D614239015126635CE7732c18fDF3'
const contractAddress = '0xf979fc3d161ad952a560b3eeb38DC98453e5F844'
const { daiAbi } = require('../constants/abis/dai')
const { usdcAbi } = require('../constants/abis/usdc')
const { wethAbi } = require('../constants/abis/weth')

const provider = new hre.ethers.providers.JsonRpcProvider(
  'http://localhost:8545'
)

let daiBalance
let usdcBalance
let wethBalance

async function main() {
  const ISwap = await hre.ethers.getContractFactory('Swap')
  console.log('Attaching...')
  const swap = await ISwap.attach(contractAddress)
  const daiAddress = await swap.DAI()
  const usdcAddress = await swap.USDC()
  const wethAddress = await swap.WETH9()

  await helpers.impersonateAccount(impAddress)
  const impersonatedSigner = provider.getSigner(impAddress)

  const daiContract = await hre.ethers.getContractAt(
    daiAbi,
    daiAddress,
    impersonatedSigner
  )

  const usdcContract = await hre.ethers.getContractAt(
    usdcAbi,
    usdcAddress,
    impersonatedSigner
  )

  const wethContract = await hre.ethers.getContractAt(
    wethAbi,
    wethAddress,
    impersonatedSigner
  )

  console.log('Approving...')

  daiBalance = await daiContract.balanceOf(impAddress)
  console.log(hre.ethers.utils.formatEther(daiBalance.toString()))
  // usdcBalance = await usdcContract.balanceOf(impAddress)
  // console.log(hre.ethers.utils.formatEther(usdcBalance.toString()))
  wethBalance = await wethContract.balanceOf(impAddress)
  console.log(hre.ethers.utils.formatEther(wethBalance.toString()))

  await daiContract.approve(swap.address, hre.ethers.utils.parseEther('100'))

  const tx = await swap
    .connect(impersonatedSigner)
    .swapExactInputSingle(hre.ethers.utils.parseEther('100'))

  daiBalance = await daiContract.balanceOf(impAddress)
  console.log(hre.ethers.utils.formatEther(daiBalance.toString()))
  // usdcBalance = await usdcContract.balanceOf(impAddress)
  // console.log(hre.ethers.utils.formatEther(usdcBalance.toString()))
  wethBalance = await wethContract.balanceOf(impAddress)
  console.log(hre.ethers.utils.formatEther(wethBalance.toString()))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// forked address
// 0xf979fc3d161ad952a560b3eeb38DC98453e5F844
