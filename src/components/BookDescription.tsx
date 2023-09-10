import {
  ArrowDownTrayIcon,
  BookOpenIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline'
import { Text } from 'components/Text'
import { toast } from 'react-toastify'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import { useText } from 'preact-i18n'
import Button from 'components/Button'
import Divider from 'components/Divider'
import FormatsStore from 'stores/FormatsStore'
import Image from 'components/Image'
import LanguageStore from 'stores/LanguageStore'
import Loading from 'components/Loading'
import SignatureStore from 'stores/SignatureStore'
import SuspenseWithError from 'components/SuspenseWithError'
import VersionStore from 'stores/VersionStore'
import classnames, {
  alignItems,
  borderRadius,
  display,
  flexDirection,
  flexWrap,
  gap,
  height,
  justifyContent,
  margin,
  overflow,
  width,
} from 'classnames/tailwind'
import download from 'downloadjs'
import env from 'helpers/env'
import message from 'helpers/message'

function BookVersionSuspended() {
  const { versions } = useSnapshot(VersionStore)
  const { language } = useSnapshot(LanguageStore)
  return <Text>{versions[language]}</Text>
}

function BookVersion() {
  const { loading } = useText('version.loading')
  const { errorLoading } = useText('version.errorLoading')
  return (
    <SuspenseWithError
      fallback={<Loading text={loading} />}
      errorText={errorLoading}
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
  const { language } = useSnapshot(LanguageStore)
  const { signatures } = useSnapshot(SignatureStore)
  const signature = signatures[language]
  const { readOnline } = useText('readOnline')
  const { buyOnAmazon } = useText('buyOnAmazon')
  const { readOnlineSlug } = useText('readOnlineSlug')
  const { download: downloadText } = useText('download')
  const { downloadFailure } = useText('downloadFailure')
  return (
    <div className={buttonContainer}>
      <Button
        title={readOnline}
        icon={<BookOpenIcon className={icon} />}
        onClick={() => {
          setLocation(`/${readOnlineSlug}`)
        }}
      />
      <Button
        title={buyOnAmazon}
        icon={<ArrowUpRightIcon className={icon} />}
        onClick={() => {
          window.open('https://a.co/d/bVn7JPU', '_blank')
        }}
      />
      {formats.map((format) => (
        <Button
          disabled={!signature}
          key={format}
          title={`${downloadText} ${format}`}
          icon={<ArrowDownTrayIcon className={icon} />}
          onClick={() => {
            return fetch(`${env.VITE_BACKEND_URL}/book/${format}`, {
              method: 'POST',
              body: JSON.stringify({
                signature,
                message: message(),
                edition: language,
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
                if (error instanceof Error) {
                  try {
                    const json = JSON.parse(error.message)
                    toast(json[language])
                  } catch (e) {
                    toast(error.message)
                  }
                } else {
                  toast(downloadFailure)
                }
              })
          }}
        />
      ))}
    </div>
  )
}

function DownloadButtons() {
  const { loading } = useText('formats.loading')
  const { errorLoading } = useText('formats.errorLoading')
  return (
    <SuspenseWithError
      fallback={<Loading text={loading} />}
      errorText={errorLoading}
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
const imageContainer = classnames(
  overflow('overflow-hidden'),
  borderRadius('rounded-lg')
)
export default function () {
  const { coverAlt } = useText('coverAlt')
  return (
    <div className={container}>
      <div className={imageContainer}>
        <Image
          src="/images/cover.webp"
          alt={coverAlt}
          width="175"
          height="257"
        />
      </div>
      <DownloadButtons />
      <BookVersion />
      <Divider />
    </div>
  )
}
