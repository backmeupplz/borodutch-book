import { useContractRead } from 'wagmi'
import erc1155abi from 'helpers/erc1155abi'

export default function (address: string) {
  const { data, isLoading } = useContractRead({
    address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    functionName: 'balanceOf',
    abi: erc1155abi,
    args: [
      address,
      '86597206928702930307486193712987064466367043993614253349341663474748447785515',
    ],
  })
  return { ownsToken: +(data || 0) > 0, isLoading }
}
