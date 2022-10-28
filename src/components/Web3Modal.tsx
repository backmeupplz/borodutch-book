import { Web3ModalEthereum } from '@web3modal/ethereum'
import {
  Web3ModalProvider,
  useAccount,
  useFetchEnsName,
} from '@web3modal/react'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { chain, configureChains, createClient } from '@wagmi/core'
import ChildrenProp from 'models/ChildrenProp'
import WalletContext from 'context/WalletContext'
import env from 'helpers/env'
import useBalance from 'hooks/useBalance'
import type { ConfigOptions } from '@web3modal/react'

const WC_PROJECT_ID = env.VITE_WC_PROJECT_ID
const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({
      apiKey: 'eDO9sGCLsLrKzRF3-02N66UWQVS42A7K',
    }),
  ]
)
const wagmiClient = createClient({
  autoConnect: true,
  connectors: Web3ModalEthereum.defaultConnectors({
    chains,
    appName: 'web3Modal',
  }),
  provider,
})
const modalConfig: ConfigOptions = {
  projectId: WC_PROJECT_ID,
  theme: 'dark',
  accentColor: 'blackWhite',
}

function Content({ children }: ChildrenProp) {
  // Account
  const { connected, address, chainId } = useAccount()
  // ENS name
  const { isLoading, name } = connected
    ? useFetchEnsName({
        chainId,
        address,
      })
    : { isLoading: true, name: null }
  // Balance
  const { ownsToken } = connected ? useBalance(address) : { ownsToken: false }
  return (
    <WalletContext.Provider
      value={{
        address,
        connected,
        name,
        chainId,
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
    <Web3ModalProvider config={modalConfig} ethereumClient={wagmiClient}>
      <Content>{children}</Content>
    </Web3ModalProvider>
  )
}
