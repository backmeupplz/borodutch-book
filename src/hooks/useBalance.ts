import { useContractRead } from '@web3modal/react'
import { useEffect } from 'preact/hooks'
import erc1155abi from 'helpers/erc1155abi'

export default function (address: string) {
  const { read, refetch } = useContractRead()
  useEffect(() => {
    void refetch({
      addressOrName: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
      functionName: 'balanceOf',
      contractInterface: erc1155abi,
      args: [
        address,
        '86597206928702930307486193712987064466367043993614253349341663474748447785515',
      ],
      chainId: 'eip155:1',
      overrides: {},
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])
  return { ownsToken: +(read || 0) > 0 }
}
