import { Link } from 'wouter'
import { Title } from 'components/Text'
import { useSnapshot } from 'valtio'
import Chapter from 'components/Toc/Chapter'
import ChapterStore from 'stores/ChapterStore'
import Loading from 'components/Loading'
import SuspenseWithError from 'components/SuspenseWithError'
import UpRightIcon from 'components/UpRightIcon'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch'),
  gap('gap-y-2')
)
const titleContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  gap('gap-x-2')
)
function FootnotesLink() {
  return (
    <div className={container}>
      <Link className={titleContainer} href="#/footnotes">
        <Title>Приложение</Title>
        <UpRightIcon />
      </Link>
    </div>
  )
}

function ChaptersSuspended() {
  const { toc } = useSnapshot(ChapterStore)
  return (
    <>
      {toc.map((chapter) => (
        <Chapter key={chapter.slug} chapter={chapter} />
      ))}
      <FootnotesLink />
    </>
  )
}

export default function () {
  return (
    <SuspenseWithError
      fallback={<Loading text="Загружаю оглавление..." />}
      errorText="Не получилось загрузить оглавление"
    >
      <ChaptersSuspended />
    </SuspenseWithError>
  )
}
