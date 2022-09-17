import { useAccount, useContractRead } from '@web3modal/react'
import { useEffect } from 'preact/hooks'
import erc1155abi from 'helpers/erc1155abi'

export default function () {
  const { connected, address } = useAccount()
  if (!connected) return false
  const { read, refetch, isLoading } = useContractRead()
  useEffect(() => {
    if (!connected) return
    void refetch({
      addressOrName: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
      functionName: 'balanceOf',
      contractInterface: erc1155abi,
      args: [address, 0],
      chainId: '1',
      overrides: {},
    })
  }, [address, connected, refetch])
  return { read, isLoading, connected }
}
