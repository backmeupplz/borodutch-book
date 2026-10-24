import { toHex } from 'viem'

// personal_sign with a hex-encoded message, same signature wagmi produced
export default function (message: string, address: string) {
  if (!window.ethereum) throw new Error('No browser wallet')
  return window.ethereum.request({
    method: 'personal_sign',
    params: [toHex(message), address as `0x${string}`],
  })
}
