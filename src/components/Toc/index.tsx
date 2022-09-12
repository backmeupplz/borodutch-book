import { useSnapshot } from 'valtio'
import Chapter from 'components/Toc/Chapter'
import ChapterStore from 'stores/ChapterStore'
import Loading from 'components/Loading'
import SuspenseWithError from 'components/SuspenseWithError'

function ChaptersSuspended() {
  const { toc } = useSnapshot(ChapterStore)
  return (
    <>
      {toc.map((chapter) => (
        <Chapter key={chapter.slug} chapter={chapter} />
      ))}
    </>
  )
}

export default function () {
  return (
    <SuspenseWithError
      fallback={<Loading />}
      errorText="Error loading chapters"
    >
      <ChaptersSuspended />
    </SuspenseWithError>
  )
}
