import { ArrowDownTrayIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Divider from 'components/Divider'
import FormatsStore from 'stores/FormatsStore'
import Image from 'components/Image'
import SuspenseWithError from 'components/SuspenseWithError'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  height,
  justifyContent,
  margin,
  visibility,
  width,
} from 'classnames/tailwind'

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
  return (
    <div className={buttonContainer}>
      <Button title="Читать онлайн" icon={<BookOpenIcon className={icon} />} />
      {formats.map((format) => (
        <Button
          key={format}
          title={`Скачать ${format}`}
          icon={<ArrowDownTrayIcon className={icon} />}
        />
      ))}
    </div>
  )
}

function DownloadButtons() {
  return (
    <SuspenseWithError
      fallback={null}
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
      <Divider />
    </div>
  )
}
