import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

export default new Web3Modal({
  cacheProvider: true,
  theme: 'dark',
  disableInjectedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: 'https://cloudflare-eth.com/v1/mainnet',
        },
      },
    },
  },
})
