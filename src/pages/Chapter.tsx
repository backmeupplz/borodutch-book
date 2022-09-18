import { Title } from 'components/Text'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import ChapterStore from 'stores/ChapterStore'
import ChapterText from 'components/Chapter/ChapterText'
import Divider from 'components/Divider'
import Footer from 'components/Chapter/Footer'
import FreeSlugsStore from 'stores/FreeSlugsStore'
import ScrollToTop from 'components/ScrollToTop'
import SignatureStore from 'stores/SignatureStore'
import SuspenseWithError from 'components/SuspenseWithError'
import WalletBlock from 'components/WalletBlock'
import classnames, {
  display,
  flexDirection,
  gap,
  margin,
  maxWidth,
  textAlign,
} from 'classnames/tailwind'
import flattenToc from 'helpers/flattenToc'

const dividerContainer = margin('my-4')
const subtitle = textAlign('text-center')
function ChapterSuspended({ location }: { location: string }) {
  const { chapters } = useSnapshot(ChapterStore)
  const chapter = chapters[location]
  const subchapter = chapter.subchapters?.[0]
  return (
    <>
      <Title large>{chapter.title}</Title>
      {subchapter && (
        <span className={subtitle}>
          <Title>{subchapter.title}</Title>
        </span>
      )}
      <div className={dividerContainer}>
        <Divider />
      </div>
      <ChapterText chapter={subchapter || chapter} />
      <Footer chapter={subchapter || chapter} />
      <ScrollToTop />
    </>
  )
}

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-4')
)
function ChapterWrapper({ location }: { location: string }) {
  const { freeSlugs } = useSnapshot(FreeSlugsStore)
  const { signature } = useSnapshot(SignatureStore)

  if (!signature && !freeSlugs.includes(location)) {
    const { toc } = useSnapshot(ChapterStore)
    const title = flattenToc(toc).find(
      (chapter) => chapter.slug === location
    )?.title
    return (
      <>
        <Title large>{title}</Title>
        <span className={subtitle}>
          <Title>(Нужно разблокировать книгу)</Title>
        </span>
        <div className={dividerContainer}>
          <Divider />
        </div>
        <div className={walletContainer}>
          <WalletBlock />
        </div>
      </>
    )
  }

  ChapterStore.fetchChapter(location)
  return <ChapterSuspended location={location} />
}

const container = classnames(maxWidth('max-w-2xl'), margin('mx-auto'))
export default function () {
  const [location] = useLocation()
  const trueLocation = location.substring(1)

  if (trueLocation === 'footnotes') {
    return null
  }

  return trueLocation ? (
    <div className={container}>
      <SuspenseWithError
        fallback={<Title large>Загружаю главу...</Title>}
        errorText="Error loading chapter"
      >
        <ChapterWrapper location={trueLocation} />
      </SuspenseWithError>
    </div>
  ) : null
}
