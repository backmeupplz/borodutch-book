import { Title } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import ChapterStore from 'stores/ChapterStore'
import ChapterText from 'components/Chapter/ChapterText'
import Divider from 'components/Divider'
import Footer from 'components/Chapter/Footer'
import Loading from 'components/Loading'
import SuspenseWithError from 'components/SuspenseWithError'

const dividerContainer = margin('my-4')
function ChapterSuspended({ location }: { location: string }) {
  const { chapters } = useSnapshot(ChapterStore)
  const chapter = chapters[location]
  return (
    <>
      <Title large>{chapter.title}</Title>
      <div className={dividerContainer}>
        <Divider />
      </div>
      <ChapterText chapter={chapter} />
      <Footer chapter={chapter} />
    </>
  )
}

export default function () {
  const [location] = useLocation()
  const trueLocation = location.substring(1)
  ChapterStore.fetchChapter(trueLocation)

  return trueLocation ? (
    <SuspenseWithError
      fallback={<Title large>Загружаю главу...</Title>}
      errorText="Error loading chapter"
    >
      <ChapterSuspended location={trueLocation} />
    </SuspenseWithError>
  ) : null
}
