import 'viem/window'

import { createPublicClient, fallback, getAddress, http, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'preact/hooks'
import { useText } from 'preact-i18n'
import ChildrenProp from 'models/ChildrenProp'
import WalletContext from 'context/WalletContext'
import env from 'helpers/env'

const client = createPublicClient({
  chain: mainnet,
  transport: fallback([
    ...(env.VITE_ALCHEMY_KEY
      ? [http(`https://eth-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`)]
      : []),
    http(),
  ]),
})

function toAddress(accounts: readonly string[]) {
  return accounts[0] ? getAddress(accounts[0]) : undefined
}

export default function ({ children }: ChildrenProp) {
  const [address, setAddress] = useState<`0x${string}`>()
  const [name, setName] = useState<string | null>(null)
  const [ownsToken, setOwnsToken] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { noWallet } = useText('wallet.noWallet')

  // Reconnect silently if the site is already authorized, follow account switches
  useEffect(() => {
    const ethereum = window.ethereum
    if (!ethereum) return
    const onAccounts = (accounts: readonly string[]) =>
      setAddress(toAddress(accounts))
    ethereum
      .request({ method: 'eth_accounts' })
      .then(onAccounts)
      .catch(console.error)
    ethereum.on('accountsChanged', onAccounts)
    return () => ethereum.removeListener('accountsChanged', onAccounts)
  }, [])

  // ENS name and book token ownership (reads always go to mainnet)
  useEffect(() => {
    setName(null)
    setOwnsToken(false)
    if (!address) return
    let current = true
    setIsLoading(true)
    void Promise.all([
      client.getEnsName({ address }).catch(() => null),
      client
        .readContract({
          address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
          abi: parseAbi([
            'function balanceOf(address, uint256) view returns (uint256)',
          ]),
          functionName: 'balanceOf',
          args: [
            address,
            86597206928702930307486193712987064466367043993614253349341663474748447785515n,
          ],
        })
        .catch(() => 0n),
    ]).then(([ensName, balance]) => {
      if (!current) return
      setName(ensName)
      setOwnsToken(balance > 0n)
      setIsLoading(false)
    })
    return () => {
      current = false
    }
  }, [address])

  async function connect() {
    if (!window.ethereum) {
      toast(noWallet, { type: 'error' })
      return
    }
    try {
      setAddress(
        toAddress(
          await window.ethereum.request({ method: 'eth_requestAccounts' })
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        connected: !!address,
        name,
        isLoading,
        ownsToken,
        connect: () => void connect(),
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
