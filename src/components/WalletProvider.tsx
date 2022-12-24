import '@rainbow-me/rainbowkit/styles.css'

import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import {
  WagmiConfig,
  configureChains,
  createClient,
  useAccount,
  useEnsName,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import ChildrenProp from 'models/ChildrenProp'
import WalletContext from 'context/WalletContext'
import env from 'helpers/env'
import useBalance from 'hooks/useBalance'

const { chains, provider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: env.VITE_ALCHEMY_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'WDLaTY',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function Content({ children }: ChildrenProp) {
  // Account
  const { isConnected, address } = useAccount()
  // ENS name
  const { isLoading, data } =
    isConnected && address
      ? useEnsName({
          address,
          chainId: 1,
        })
      : { isLoading: true, data: null }
  // Balance
  const { ownsToken } =
    isConnected && address ? useBalance(address) : { ownsToken: false }
  return (
    <WalletContext.Provider
      value={{
        address,
        connected: isConnected,
        name: data,
        isLoading,
        ownsToken,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default function ({ children }: ChildrenProp) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={midnightTheme({
          ...midnightTheme.accentColors.purple,
        })}
      >
        <Content>{children}</Content>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
