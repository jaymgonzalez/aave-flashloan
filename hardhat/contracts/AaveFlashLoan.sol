// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";

interface ISwap {
    function swapExactInputSingle(uint256 amountIn) external returns (uint256);
}

import "hardhat/console.sol";

contract AaveFlashLoan is FlashLoanSimpleReceiverBase {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    ISwap public immutable swap;

    address public constant tokenOut =
        0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    constructor(
        IPoolAddressesProvider provider,
        ISwap _swap
    ) FlashLoanSimpleReceiverBase(provider) {
        swap = _swap;
    }

    function aaveFlashloan(address loanToken, uint256 loanAmount) external {
        IPool(address(POOL)).flashLoanSimple(
            address(this),
            loanToken,
            loanAmount,
            "0x",
            0
        );
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address, // initiator
        bytes memory
    ) public override returns (bool) {
        require(
            amount <= IERC20(asset).balanceOf(address(this)),
            "Invalid balance for the contract"
        );
        console.log("borrowed amount:", amount);

        swap.swapExactInputSingle(amount);

        // swap.swapExactInputSingle(amount, asset, tokenOut);
        // swap.swapExactOutputSingle(amount, premium);

        // pay back the loan amount and the premium (flashloan fee)
        uint256 amountToReturn = amount.add(premium);
        require(
            IERC20(asset).balanceOf(address(this)) >= amountToReturn,
            "Not enough amount to return loan"
        );
        console.log("flashloan fee: ", premium);

        approveToken(asset, address(POOL), amountToReturn);

        return true;
    }

    function approveToken(
        address token,
        address to,
        uint256 amountIn
    ) internal {
        require(IERC20(token).approve(to, amountIn), "approve failed");
    }
}
