import { ArrowDownTrayIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { Text } from 'components/Text'
import { toast } from 'react-toastify'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Divider from 'components/Divider'
import FormatsStore from 'stores/FormatsStore'
import Image from 'components/Image'
import Loading from 'components/Loading'
import SignatureStore from 'stores/SignatureStore'
import SuspenseWithError from 'components/SuspenseWithError'
import VersionStore from 'stores/VersionStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  height,
  justifyContent,
  margin,
  width,
} from 'classnames/tailwind'
import download from 'downloadjs'
import env from 'helpers/env'
import message from 'helpers/message'

function BookVersionSuspended() {
  const {
    version: { version },
  } = useSnapshot(VersionStore)
  return <Text>{version}</Text>
}

function BookVersion() {
  return (
    <SuspenseWithError
      fallback={<Loading text="Загружаю версию..." />}
      errorText="Не получилось загрузить версию"
    >
      <BookVersionSuspended />
    </SuspenseWithError>
  )
}

const icon = classnames(width('w-4'), height('h-4'))
const buttonContainer = classnames(
  display('flex'),
  flexDirection('flex-row', 'lg:flex-col'),
  gap('gap-2'),
  flexWrap('flex-wrap', 'lg:flex-nowrap'),
  justifyContent('justify-center')
)
function DownloadButtonsSuspended() {
  const { formats } = useSnapshot(FormatsStore)
  const [, setLocation] = useLocation()
  const { signature } = useSnapshot(SignatureStore)
  return (
    <div className={buttonContainer}>
      <Button
        title="Читать онлайн"
        icon={<BookOpenIcon className={icon} />}
        onClick={() => {
          setLocation('/vvedenie')
        }}
      />
      {formats.map((format) => (
        <Button
          disabled={!signature}
          key={format}
          title={`Скачать ${format}`}
          icon={<ArrowDownTrayIcon className={icon} />}
          onClick={() => {
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
        />
      ))}
    </div>
  )
}

function DownloadButtons() {
  return (
    <SuspenseWithError
      fallback={<Loading text="Загружаю форматы..." />}
      errorText="Не получилось загрузить форматы"
    >
      <DownloadButtonsSuspended />
    </SuspenseWithError>
  )
}

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  margin('mt-6'),
  gap('gap-4')
)
export default function () {
  return (
    <div className={container}>
      <Image
        src="/images/cover.webp"
        alt="Обложка книги"
        width="175"
        height="257.5"
      />
      <DownloadButtons />
      <BookVersion />
      <Divider />
    </div>
  )
}
