const { ethers } = require('hardhat')
const helpers = require('@nomicfoundation/hardhat-network-helpers')
const {
  contractAddress,
  impAddress,
  daiAddress,
} = require('../constants/addresses')
const { daiAbi } = require('../constants/abis/dai')

// const { getErc20Balance } = require('../utils/token')

const provider = new hre.ethers.providers.JsonRpcProvider(
  'http://localhost:8545'
)

async function main() {
  const Flashloan = await ethers.getContractFactory('AaveFlashLoan')
  const flashloan = await Flashloan.attach(contractAddress)
  // const [owner] = await ethers.getSigners()

  await helpers.impersonateAccount(impAddress)
  const impersonatedSigner = provider.getSigner(impAddress)

  const daiContract = await hre.ethers.getContractAt(
    daiAbi,
    daiAddress,
    impersonatedSigner
  )

  // Transfer Dai to contract
  // await daiContract.transfer(flashloan.address, ethers.utils.parseEther('1000'))
  // const contractBalance = await daiContract.balanceOf(flashloan.address)
  // console.log(ethers.utils.formatEther(contractBalance.toString()), 'DAI')

  await flashloan.aaveFlashloan(daiAddress, 1_000_000_000_000)

  const contractBalance = await daiContract.balanceOf(flashloan.address)
  console.log(ethers.utils.formatEther(contractBalance.toString()), 'DAI')

  // const USDC = await getERC20ContractFromAddress(erc20Address.USDC)
  // const tx = await Flashloan.dodoFlashLoan(
  //   {
  //     flashLoanPool: dodoV2Pool.WETH_USDC,
  //     loanAmount: getBigNumber(1000, 6),
  //     routes: [
  //       {
  //         hops: [
  //           {
  //             // protocol number
  //             protocol: 1,
  //             // byte data used for swapping
  //             data: ethers.utils.defaultAbiCoder.encode(
  //               ['address'],
  //               [findRouterFromProtocol(1)]
  //             ),
  //             path: [erc20Address.USDC, erc20Address.WETH],
  //           },
  //           {
  //             // UniswapV3
  //             protocol: 0,
  //             data: ethers.utils.defaultAbiCoder.encode(
  //               ['address', 'uint24'],
  //               // 0.05 % => 500 (Input USDC/WETH pool fee)
  //               [findRouterFromProtocol(0), 500]
  //             ),
  //             path: [erc20Address.WETH, erc20Address.USDC],
  //           },
  //         ],
  //         part: 10000,
  //       },
  //     ],
  //   },
  //   {
  //     gasLimit: 3_000_000,
  //     // refer to https://polygonscan.com/gastracker
  //     gasPrice: ethers.utils.parseUnits('300', 'gwei'),
  //   }
  // )
  // console.log(tx.hash)
  // await getErc20Balance(USDC, owner.address, 'balance', 6)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
