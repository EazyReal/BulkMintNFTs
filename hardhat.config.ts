import * as dotenv from "dotenv"

import { HardhatUserConfig, task } from "hardhat/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"

dotenv.config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_API!,
        blockNumber: 24423315, // 0x4c7ab22d3ccfc99eac772e059b2cc3294dd217f182f40dbf2c071d4eaa4ddec2	Set Public Sale ...	24423317	4 hrs 17 mins ago	0x195eb091c672998de54aba9080e59616d2b0eaf5	 IN 	 0xa3fffddc964c2122ffa3a43e3aa8125f4587dc21	0 MATIC	0.0023284
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: [process.env.PRIVATE_KEY!],
    },
    polygon: {
      url: process.env.ALCHEMY_API!,
      accounts: [process.env.PRIVATE_KEY!],
      gasPrice: "auto",
      gasMultiplier: 1.2,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  /*etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },*/
}

export default config
