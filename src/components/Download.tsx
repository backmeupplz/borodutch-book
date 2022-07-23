import { Suspense } from 'preact/compat'
import { proxy, useSnapshot } from 'valtio'
import { toast } from 'react-toastify'
import Button from 'components/Button'
import Text from 'components/Text'
import WalletStore from 'stores/WalletStore'
import classnames, {
  display,
  flexDirection,
  flexWrap,
  gap,
} from 'classnames/tailwind'
import download from 'downloadjs'
import env from 'helpers/env'

const state = proxy({
  formats: fetch(`${env.VITE_BACKEND_URL}/book/formats`).then(
    (res) => res.json() as Promise<string[]>
  ),
})

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-5'),
  flexWrap('flex-wrap')
)
function Suspended() {
  const { formats } = useSnapshot(state)
  return (
    <div className={container}>
      {formats.map((format) => (
        <Button
          key={format}
          onClick={async () => {
            const message = `Подпись ${WalletStore.account} для загрузки книги в формате ${format}`
            const signature = await WalletStore.signMessage(message)
            return fetch(`${env.VITE_BACKEND_URL}/book/${format}`, {
              method: 'POST',
              body: JSON.stringify({
                signature,
                message,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(async function (resp) {
                // If error status throw
                if (!resp.ok) {
                  throw new Error((await resp.json()).message)
                }
                return resp.blob()
              })
              .then(function (blob) {
                return download(blob, `wdlaty.${format}`)
              })
              .catch((error) => {
                toast(
                  error instanceof Error ? error.message : 'Failed to download'
                )
              })
          }}
        >
          Скачать {format.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={<Text>Загружаю форматы...</Text>}>
      <Suspended />
      <Text>(версия с феминитивами и default-female будет чуть позже...)</Text>
    </Suspense>
  )
}
