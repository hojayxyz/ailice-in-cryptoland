require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./src",
  },
  networks: {
    zKatana: {
      url: `https://rpc.zkatana.gelato.digital`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
