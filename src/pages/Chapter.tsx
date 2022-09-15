import { Title } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import ChapterStore from 'stores/ChapterStore'
import ChapterText from 'components/ChapterText'
import Divider from 'components/Toc/Divider'
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
    </>
  )
}

export default function () {
  const [location] = useLocation()
  const trueLocation = location.substring(1)
  ChapterStore.fetchChapter(trueLocation)

  return trueLocation ? (
    <SuspenseWithError fallback={<Loading />} errorText="Error loading chapter">
      <ChapterSuspended location={trueLocation} />
    </SuspenseWithError>
  ) : null
}
