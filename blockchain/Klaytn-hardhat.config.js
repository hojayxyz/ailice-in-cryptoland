require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./src",
  },
  networks: {
    Klaytn: {
      url: `https://klaytn-pokt.nodies.app`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
