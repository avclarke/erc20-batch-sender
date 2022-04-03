import { ethers, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Network: ", network.name);
  console.log("Deploying BatchSender from:", deployer.address);

  const BatchSender = await ethers.getContractFactory("ERC20BatchSender");
  const batchSender = await BatchSender.deploy();

  console.log("Deployed:", batchSender.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
