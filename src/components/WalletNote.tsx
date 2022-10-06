import { Text as IntlText } from 'preact-i18n'
import { Text } from 'components/Text'
import { useSnapshot } from 'valtio'
import SignatureStore from 'stores/SignatureStore'
import WalletContext from 'context/WalletContext'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
export default function () {
  const { signature } = useSnapshot(SignatureStore)
  return (
    <WalletContext.Consumer>
      {({ connected, ownsToken }) => (
        <div className={container}>
          {!connected && (
            <Text>
              <IntlText id="wallet.connect" />
            </Text>
          )}
          {connected && !ownsToken && (
            <Text>
              <IntlText id="wallet.buyToken" />
            </Text>
          )}
          {connected && ownsToken && !signature && (
            <Text>
              <IntlText id="wallet.signMessage" />
            </Text>
          )}
          {connected && ownsToken && signature && (
            <Text>
              <IntlText id="wallet.success" />
            </Text>
          )}
        </div>
      )}
    </WalletContext.Consumer>
  )
}
