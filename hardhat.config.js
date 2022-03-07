require("@nomiclabs/hardhat-waffle");
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789"

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/7mEHBbO3oXox13fx4MMoO_eJ7IJxC3GX",
      accounts: [privateKey]
    }
  }
};
