import { Web3ModalEthereum } from '@web3modal/ethereum'
import { Web3ModalProvider } from '@web3modal/react'
import { chain, configureChains, createClient } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import ChildrenProp from 'models/ChildrenProp'
import env from 'helpers/env'
import type { ConfigOptions } from '@web3modal/react'

const WC_PROJECT_ID = env.VITE_WC_PROJECT_ID
const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
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

export default function ({ children }: ChildrenProp) {
  return (
    <Web3ModalProvider config={modalConfig} ethereumClient={wagmiClient}>
      {children}
    </Web3ModalProvider>
  )
}
