import { expect } from "chai";
import { ethers } from "hardhat";

import { ERC20Token, ERC20BatchSender } from "../typechain-types";

describe("BatchSender", function () {
  let token: ERC20Token;
  let batchSender: ERC20BatchSender;

  before(async () => {
    const Token = await ethers.getContractFactory("ERC20Token");
    token = await Token.deploy();

    const BatchSender = await ethers.getContractFactory("ERC20BatchSender");
    batchSender = await BatchSender.deploy();
  });

  it("Should revert with invalid params", async function () {
    const [owner, user2, user3] = await ethers.getSigners();

    await expect(
      batchSender.batchTransfer(
        token.address,
        [owner.address, user2.address, user3.address],
        ["10"]
      )
    ).to.be.revertedWith(
      "Number of recipients does not match number of values"
    );
  });

  it("Should batch transfer tokens", async function () {
    const [owner, user2, user3, user4] = await ethers.getSigners();

    await token.approve(batchSender.address, ethers.utils.parseEther("100000"));

    const amount1 = ethers.utils.parseEther("100");
    const amount2 = ethers.utils.parseEther("200");
    const amount3 = ethers.utils.parseEther("200");

    await batchSender
      .connect(owner)
      .batchTransfer(
        token.address,
        [user2.address, user3.address, user4.address],
        [amount1, amount2, amount3]
      );

    const bal1 = await token.balanceOf(user2.address);
    const bal2 = await token.balanceOf(user3.address);
    const bal3 = await token.balanceOf(user4.address);

    expect(bal1).to.equal(amount1);
    expect(bal2).to.equal(amount2);
    expect(bal3).to.equal(amount3);
  });
});
