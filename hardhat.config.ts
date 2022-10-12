import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-contract-sizer";
import "hardhat-log-remover";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "solidity-coverage";
import "hardhat-gas-reporter";
import {CHAINID} from "./constants/constants";

require('dotenv').config({path: '.env'})

const ETHERSCAN_API_KEYS: Map<number, string> = new Map<number, string>([
    [CHAINID.ETH_MAINNET, `${process.env.apiKey}`],
    [CHAINID.ETH_GOERLI, `${process.env.apiKey}`],
    [CHAINID.POLYGON, `${process.env.apiKeyPolygon}`],
    [CHAINID.POLYGON_MUMBAI, `${process.env.apiKeyPolygon}`]
]);
const chainId = process.env.CHAINID ? Number(process.env.CHAINID) : 5;

const config: HardhatUserConfig = {
  paths: {
    deploy: "scripts/deploy",
    deployments: "deployments",
  },
  networks: {
    // Test net
    rinkeby: {
      url: `${process.env.provider_rinkeby}`,
      accounts: {
        mnemonic: `${process.env.mnemonic_rinkeby}`,
        path: "m/44'/60'/0'/0",
        initialIndex: 1,
        count: 10
      }
    },
    goerli: {
      url: `${process.env.provider_goerli}`,
      accounts: {
        mnemonic: `${process.env.mnemonic_goerli}`,
        path: "m/44'/60'/0'/0",
        initialIndex: 1,
        count: 10
      }
    },
    mumbai: {
      url: `${process.env.provider_mumbai}`,
      accounts: {
        mnemonic: `${process.env.mnemonic_mumbai}`,
        path: "m/44'/60'/0'/0",
        initialIndex: 1,
        count: 10
      }
    },

    // Main net
    mainnet: {
      url: `${process.env.provider_mainnet}`,
      accounts: {
        mnemonic: `${process.env.mnemonic_mainnet}`,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10
      }
    },

    // Polygon main net
    polygon: {
      url: `${process.env.provider_polygon}`,
      accounts: {
        mnemonic: `${process.env.mnemonic_polygon}`,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10
      }
    }
  },
  namedAccounts: {
    deployer: {
      default: 5,
      1: "0x60d1Ce3e4aC99f1f27f276A26BEeb4454d4f1161",
      5: "0x637856e617b168cF63C0A0E4FEf923be7C67FFcf",
      137: "0x60d1Ce3e4aC99f1f27f276A26BEeb4454d4f1161",
      80001: "0x637856e617b168cF63C0A0E4FEf923be7C67FFcf",
    },
    admin: {
      default: 5,
      1: "0x5931f4A88807d29B1732cAe52D5cEa6C3DE2119D",
      5: "0xbC86F047d37D29cB97ee7D860c5355A5f12c62d5",
      137: "0x5931f4A88807d29B1732cAe52D5cEa6C3DE2119D",
      80001: "0xbC86F047d37D29cB97ee7D860c5355A5f12c62d5",
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.com/
    apiKey: ETHERSCAN_API_KEYS.get(chainId)
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800
      }
    }
  },
};

export default config;
