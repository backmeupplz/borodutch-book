import { BoldText, Text } from 'components/Text'
import { Text as IntlText, useText } from 'preact-i18n'
import { useSnapshot } from 'valtio'
import Chapter from 'models/Chapter'
import ChapterStore from 'stores/ChapterStore'
import CompatibilityStore from 'stores/CompatibilityStore'
import Divider from 'components/Divider'
import LanguageStore from 'stores/LanguageStore'
import Loading from 'components/Loading'
import NextButton from 'components/Chapter/NextButton'
import SuspenseWithError from 'components/SuspenseWithError'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  margin,
  padding,
} from 'classnames/tailwind'
import flattenToc from 'helpers/flattenToc'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  margin('my-4')
)
const row = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  padding('py-4'),
  gap('gap-x-4')
)
const col = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-start')
)
function FooterSuspended({ chapter }: { chapter: Chapter }) {
  const { toc } = useSnapshot(ChapterStore)
  const slug = chapter.slug
  // flatten toc
  const tocFlat = flattenToc(toc)
  const { lastReadySlugs } = useSnapshot(CompatibilityStore)
  const { language } = useSnapshot(LanguageStore)
  const lastReadySlug = lastReadySlugs[language]
  const lastReadySlugIndex = lastReadySlug
    ? tocFlat.findIndex((item) => item.slug === lastReadySlug)
    : tocFlat.length - 1
  const index = tocFlat.findIndex((item) => item.slug === slug)
  const next = index + 1 <= lastReadySlugIndex ? tocFlat[index + 1] : undefined
  return next ? (
    <div className={container}>
      <Divider />
      <div className={row}>
        <div className={col}>
          <BoldText>
            <IntlText id="nextChapter" />
          </BoldText>
          <Text>{next.title}</Text>
        </div>
        <NextButton slug={next.slug} />
      </div>
    </div>
  ) : null
}

export default function ({ chapter }: { chapter: Chapter }) {
  const { loading } = useText('toc.loading')
  const { errorLoading } = useText('toc.errorLoading')
  return (
    <SuspenseWithError
      fallback={<Loading text={loading} />}
      errorText={errorLoading}
    >
      <FooterSuspended chapter={chapter} />
    </SuspenseWithError>
  )
}
