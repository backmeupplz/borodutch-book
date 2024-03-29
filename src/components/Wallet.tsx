import {
  CheckIcon,
  KeyIcon,
  RocketLaunchIcon,
  WalletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Text, useText } from 'preact-i18n'
import { useSignMessage } from 'wagmi'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import LanguageStore from 'stores/LanguageStore'
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
  const { language } = useSnapshot(LanguageStore)
  const { signatures } = useSnapshot(SignatureStore)
  const signature = signatures[language]
  const { signMessageAsync: sign } = useSignMessage()
  const { connectWallet } = useText('wallet.buttons.connectWallet')
  const { buyToken } = useText('wallet.buttons.buyToken')
  const { createSignature } = useText('wallet.buttons.createSignature')
  return (
    <WalletContext.Consumer>
      {({ address, connected, name, ownsToken }) => (
        <div className={container}>
          {!connected && (
            <ConnectButton
              label={connectWallet}
              accountStatus="address"
              chainStatus="none"
              showBalance={false}
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
                  <Text id="wallet.buttons.gotToken" />
                </div>
              ) : (
                <div className={addressContainer}>
                  <XMarkIcon className={icon} />
                  <Text id="wallet.buttons.noToken" />
                </div>
              )}
              {ownsToken &&
                (signature ? (
                  <div className={addressContainer}>
                    <CheckIcon className={icon} />
                    <Text id="wallet.buttons.gotSignature" />
                  </div>
                ) : (
                  <div className={addressContainer}>
                    <XMarkIcon className={icon} />
                    <Text id="wallet.buttons.noSignature" />
                  </div>
                ))}
              {ownsToken && !signature && (
                <Button
                  title={createSignature}
                  icon={<KeyIcon className={icon} />}
                  onClick={async () => {
                    try {
                      SignatureStore.signatures[language] = await sign({
                        message: message(),
                      })
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                />
              )}
              {!ownsToken && (
                <Button
                  title={buyToken}
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
