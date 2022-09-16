import { Title } from 'components/Text'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import ChapterStore from 'stores/ChapterStore'
import ChapterText from 'components/Chapter/ChapterText'
import Divider from 'components/Divider'
import Footer from 'components/Chapter/Footer'
import ScrollToTop from 'components/ScrollToTop'
import SuspenseWithError from 'components/SuspenseWithError'
import classnames, { margin, maxWidth, textAlign } from 'classnames/tailwind'

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

const container = classnames(maxWidth('max-w-2xl'), margin('mx-auto'))
export default function () {
  const [location] = useLocation()
  const trueLocation = location.substring(1)
  ChapterStore.fetchChapter(trueLocation)

  return trueLocation ? (
    <div className={container}>
      <SuspenseWithError
        fallback={<Title large>Загружаю главу...</Title>}
        errorText="Error loading chapter"
      >
        <ChapterSuspended location={trueLocation} />
      </SuspenseWithError>
    </div>
  ) : null
}
