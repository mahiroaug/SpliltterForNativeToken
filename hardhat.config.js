require("dotenv").config({ path: ".env" });

require("@nomicfoundation/hardhat-toolbox");
require("@fireblocks/hardhat-fireblocks");
require("@openzeppelin/hardhat-upgrades");
//const { ApiBaseUrl } = require("@fireblocks/fireblocks-web3-provider");

const fs = require("fs");
const path = require("path");
const fb_apiSecret = fs.readFileSync(
  path.resolve("fireblocks_secret_SIGNER.key"),
  "utf8"
);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    holesky: {
      url: "https://rpc.ankr.com/eth_holesky",
      fireblocks: {
        //apiBaseUrl: process.env.FIREBLOCKS_URL,
        privateKey: fb_apiSecret,
        apiKey: process.env.FIREBLOCKS_API_KEY_SIGNER,
        vaultAccountIds: process.env.FIREBLOCKS_VID_DEPLOYER,
      },
    },
    amoy: {
      url: "https://rpc.ankr.com/polygon_amoy",
      fireblocks: {
        //apiBaseUrl: process.env.FIREBLOCKS_URL,
        privateKey: fb_apiSecret,
        apiKey: process.env.FIREBLOCKS_API_KEY_SIGNER,
        vaultAccountIds: process.env.FIREBLOCKS_VID_DEPLOYER,
      },
    },
    amoy_contractUpgrade: {
      url: "https://rpc.ankr.com/polygon_amoy",
      fireblocks: {
        //apiBaseUrl: process.env.FIREBLOCKS_URL,
        privateKey: fb_apiSecret,
        apiKey: process.env.FIREBLOCKS_API_KEY_SIGNER,
        vaultAccountIds: process.env.FIREBLOCKS_VID_CONTRACTOWNER,
      },
    },
    amoy_metamask: {
      url: "https://rpc.ankr.com/polygon_amoy",
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
    polygon_metamask_mainnet: {
      url: "https://rpc.ankr.com/polygon",
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY_MAINNET}`],
    },
  },
  etherscan: {
    apiKey: {
      amoy_metamask: process.env.POLYGONSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
    },
    customChains: [
      {
        network: "amoy_metamask",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
