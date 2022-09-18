import { createContext } from 'preact'

export default createContext<{
  address?: string | null
  connected: boolean
  name?: string | null
  chainId: string
  isLoading: boolean
  ownsToken: boolean
}>({
  address: undefined,
  connected: false,
  name: undefined,
  chainId: 'eip155:1',
  isLoading: false,
  ownsToken: false,
})
