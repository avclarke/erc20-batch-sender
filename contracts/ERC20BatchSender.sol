// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ERC20BatchSender {
    using SafeMath for uint256;

    event BatchSent(uint256 total, address tokenAddress);

    // Transfer token in batches by providing ERC20 token address,
    // list of recipient addresses and list of amounts
    function batchTransfer(
        address tokenAddress,
        address[] calldata tokenHolders,
        uint256[] calldata amounts
    ) external {
        require(
            tokenHolders.length == amounts.length,
            "Number of recipients does not match number of values"
        );

        uint256 total = 0;

        for (uint256 index = 0; index < tokenHolders.length; index++) {
            require(
                ERC20(tokenAddress).transferFrom(
                    msg.sender,
                    tokenHolders[index],
                    amounts[index]
                ),
                "Failed to transfer token"
            );
            total += amounts[index];
        }
        emit BatchSent(total, tokenAddress);
    }
}
