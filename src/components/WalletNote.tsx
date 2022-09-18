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
            <Text>Вам нужно подключить свой адрес к этому сайту.</Text>
          )}
          {connected && !ownsToken && (
            <Text>
              Вам нужно купить токен на OpenSea, чтобы получить доступ к книге.
            </Text>
          )}
          {connected && ownsToken && !signature && (
            <Text>
              Вам нужно подписать сообщение, чтобы получить доступ к книге.
            </Text>
          )}
          {connected && ownsToken && signature && (
            <Text>
              Поздравляю, вы успешно подписали сообщение — наслаждайтесь
              неограниченным доступом к книге!
            </Text>
          )}
        </div>
      )}
    </WalletContext.Consumer>
  )
}
