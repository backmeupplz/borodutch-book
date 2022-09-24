import {
  CheckIcon,
  KeyIcon,
  RocketLaunchIcon,
  WalletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useConnectModal, useSignMessage } from '@web3modal/react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import SignatureStore from 'stores/SignatureStore'
import WalletContext from 'context/WalletContext'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  flexWrap,
  gap,
  height,
  justifyContent,
  padding,
  textColor,
  transitionProperty,
  width,
  wordBreak,
} from 'classnames/tailwind'
import message from 'helpers/message'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-2')
)
const icon = classnames(width('w-4'), height('h-4'))
const blocksContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  alignItems('items-center'),
  gap('gap-2')
)
const addressContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-2'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  backgroundColor('bg-background'),
  borderRadius('rounded-full'),
  padding('px-4', 'py-3'),
  textColor('text-primary'),
  transitionProperty('transition-colors'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-secondary'),
  wordBreak('break-all')
)
export default function () {
  const { open } = useConnectModal()
  const { signature } = useSnapshot(SignatureStore)
  const { signature: newSignature, sign } = useSignMessage()
  if (newSignature && signature !== newSignature) {
    SignatureStore.signature = newSignature
  }
  return (
    <WalletContext.Consumer>
      {({ address, connected, name, ownsToken }) => (
        <div className={container}>
          {!connected && (
            <Button
              title="Подключить кошелек!"
              icon={<WalletIcon className={icon} />}
              onClick={() => {
                open()
              }}
            />
          )}
          {connected && (
            <div className={blocksContainer}>
              <div className={addressContainer}>
                <WalletIcon className={icon} />
                {name || address}
              </div>
              {ownsToken ? (
                <div className={addressContainer}>
                  <CheckIcon className={icon} />
                  Есть токен!
                </div>
              ) : (
                <div className={addressContainer}>
                  <XMarkIcon className={icon} />
                  Нет токена
                </div>
              )}
              {ownsToken &&
                (signature ? (
                  <div className={addressContainer}>
                    <CheckIcon className={icon} />
                    Есть подпись!
                  </div>
                ) : (
                  <div className={addressContainer}>
                    <XMarkIcon className={icon} />
                    Нет подписи
                  </div>
                ))}
              {ownsToken && !signature && (
                <Button
                  title="Создать подпись!"
                  icon={<KeyIcon className={icon} />}
                  onClick={() => {
                    void sign(message)
                  }}
                />
              )}
              {!ownsToken && (
                <Button
                  title="Купить токен!"
                  icon={<RocketLaunchIcon className={icon} />}
                  onClick={() => {
                    window.open(
                      'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/86597206928702930307486193712987064466367043993614253349341663474748447785515',
                      '_blank'
                    )
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </WalletContext.Consumer>
  )
}
