import { createContext } from 'preact'

export default createContext<{
  address?: string | null
  connected: boolean
  name?: string | null
  isLoading: boolean
  ownsToken: boolean
  connect: () => void
}>({
  address: undefined,
  connected: false,
  name: undefined,
  isLoading: false,
  ownsToken: false,
  connect: () => undefined,
})
