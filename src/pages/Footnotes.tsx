import { Text, Title } from 'components/Text'
import { useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import Divider from 'components/Divider'
import FootnoteStore from 'stores/FootnoteStore'
import Link from 'components/Link'
import MetadataStore from 'stores/MetadataStore'
import SuspenseWithError from 'components/SuspenseWithError'
import bookTitle from 'helpers/bookTitle'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  margin,
  maxWidth,
  padding,
} from 'classnames/tailwind'

const footnotesContainer = classnames(
  display('flex'),
  flexDirection('flex-col')
)
function FootnotesSuspended() {
  const { allFootnotes } = useSnapshot(FootnoteStore)
  return (
    <div className={footnotesContainer}>
      {allFootnotes?.map((f, i) =>
        f.url ? (
          <Text key={`${i}`}>
            {i + 1}. <Link url={f.url}>«{f.title}»</Link>
          </Text>
        ) : (
          <Text key={`${i}`}>
            {i + 1}. {f.title}
          </Text>
        )
      )}
    </div>
  )
}

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-stretch'),
  gap('gap-y-4'),
  padding('pt-4', 'pb-8'),
  maxWidth('max-w-2xl'),
  margin('mx-auto')
)
export default function () {
  useEffect(() => {
    MetadataStore.title = `Приложение | ${bookTitle.short}`
  }, [])
  FootnoteStore.fetchFootnotes()
  return (
    <div className={container}>
      <Title large>Приложение</Title>
      <Divider />
      <SuspenseWithError
        fallback={<Text>Загружаю приложение...</Text>}
        errorText="Не получилось загрузить приложение"
      >
        <FootnotesSuspended />
      </SuspenseWithError>
    </div>
  )
}
