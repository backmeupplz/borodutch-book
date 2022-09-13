import { Link } from 'wouter'
import { TocChapter } from 'components/Text'
import Chapter from 'models/Chapter'
import Subchapters from 'components/Toc/Subchapters'
import UpRightIcon from 'components/UpRightIcon'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch')
)
const titleContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  padding('py-2'),
  gap('gap-x-2')
)

export default function ({ chapter }: { chapter: Chapter }) {
  return (
    <div className={container}>
      <Link className={titleContainer} href={`/${chapter.slug}`}>
        <TocChapter>{chapter.title}</TocChapter>
        <UpRightIcon />
      </Link>
      {!!chapter.subchapters.length && <Subchapters chapter={chapter} />}
    </div>
  )
}
