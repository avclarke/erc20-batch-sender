import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import * as dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const apiKey = process.env.INFURA_KEY;
const moralisApiKey = process.env.MORALIS_SPEED_NODE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${apiKey}`,
      accounts: [`${privateKey}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${apiKey}`,
      accounts: [`${privateKey}`],
      gasPrice: 100000000000,
    },
    avalanche: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisApiKey}/avalanche/mainnet`,
      accounts: [`${privateKey}`],
    },
    fuji: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisApiKey}/avalanche/testnet`,
      accounts: [`${privateKey}`],
    },
  },
};
