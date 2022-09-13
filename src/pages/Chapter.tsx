import { Text } from 'components/Text'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import ChapterStore from 'stores/ChapterStore'
import Loading from 'components/Loading'
import SuspenseWithError from 'components/SuspenseWithError'

function ChapterSuspended({ location }: { location: string }) {
  const { chapters } = useSnapshot(ChapterStore)
  const chapter = chapters[location]
  return <Text>{JSON.stringify(chapter, undefined, 2)}</Text>
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
