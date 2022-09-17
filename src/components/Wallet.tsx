import { WalletIcon } from '@heroicons/react/24/outline'
import { useAccount, useConnectModal } from '@web3modal/react'
import Button from 'components/Button'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  height,
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-2')
)
const icon = classnames(width('w-4'), height('h-4'))
export default function () {
  const { open } = useConnectModal()
  const { connected, address } = useAccount()
  return (
    <div className={container}>
      {(!connected || !address) && (
        <Button
          title="Подключить кошелек!"
          icon={<WalletIcon className={icon} />}
          onClick={() => {
            open()
          }}
        />
      )}
    </div>
  )
}
