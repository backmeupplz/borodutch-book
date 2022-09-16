import { ConnectButton, useConnectModal } from '@web3modal/react'
import { WalletIcon } from '@heroicons/react/24/outline'
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
  return (
    <div className={container}>
      <Button
        title="Подключить кошелек!"
        icon={<WalletIcon className={icon} />}
        onClick={() => {
          open()
        }}
      />
    </div>
  )
}
