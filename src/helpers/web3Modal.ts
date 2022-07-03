import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnect from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import env from 'helpers/env'

export default new Web3Modal({
  cacheProvider: true,
  theme: 'dark',
  disableInjectedProvider: false,
  network: env.network,
  providerOptions: {
    walletconnect: {
      package: WalletConnect,
      options: {
        rpc: {
          5: env.rpc,
        },
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: env.appName,
        rpc: {
          5: env.rpc,
        },
        darkMode: true,
      },
    },
  },
})
