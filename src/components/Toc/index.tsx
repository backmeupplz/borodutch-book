import { Link } from 'wouter'
import { Text, useText } from 'preact-i18n'
import { Title } from 'components/Text'
import { useSnapshot } from 'valtio'
import Chapter from 'components/Toc/Chapter'
import ChapterStore from 'stores/ChapterStore'
import CompatibilityStore from 'stores/CompatibilityStore'
import LanguageStore from 'stores/LanguageStore'
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
import flattenToc from 'helpers/flattenToc'

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
        <Title>
          <Text id="endnotes.title" />
        </Title>
        <UpRightIcon />
      </Link>
    </div>
  )
}

function ChaptersSuspended() {
  const { toc } = useSnapshot(ChapterStore)
  const tocFlat = flattenToc(toc)
  const { lastReadySlugs } = useSnapshot(CompatibilityStore)
  const { language } = useSnapshot(LanguageStore)
  const lastReadySlug = lastReadySlugs[language]
  const lastReadySlugIndex = lastReadySlug
    ? tocFlat.findIndex((item) => item.slug === lastReadySlug)
    : tocFlat.length - 1
  return (
    <>
      {toc.map((chapter) => (
        <Chapter
          key={chapter.slug}
          chapter={chapter}
          disabled={
            tocFlat.findIndex((item) => item.slug === chapter.slug) >
            lastReadySlugIndex
          }
        />
      ))}
      <FootnotesLink />
    </>
  )
}

export default function () {
  const { loading } = useText('toc.loading')
  const { errorLoading } = useText('toc.errorLoading')
  const { language } = useSnapshot(LanguageStore)
  ChapterStore.fetchToc(language)
  return (
    <SuspenseWithError
      fallback={<Loading text={loading} />}
      errorText={errorLoading}
    >
      <ChaptersSuspended />
    </SuspenseWithError>
  )
}
