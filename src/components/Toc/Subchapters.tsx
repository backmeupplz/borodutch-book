import { Link } from 'wouter'
import { Text } from 'components/Text'
import Chapter from 'models/Chapter'
import UpRightIcon from 'components/UpRightIcon'
import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
} from 'classnames/tailwind'

const subchapterContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  padding('py-2'),
  gap('gap-x-2')
)
const subSubchapterContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  padding('pl-4')
)
function Subchapter({ chapter }: { chapter: Chapter }) {
  return (
    <>
      <Link className={subchapterContainer} href={`/${chapter.slug}`}>
        <Text>{chapter.title}</Text>
        <UpRightIcon />
      </Link>
      {!!chapter.subchapters?.length && (
        <div className={subSubchapterContainer}>
          {chapter.subchapters.map((subchapter) => (
            <Subchapter chapter={subchapter} />
          ))}
        </div>
      )}
    </>
  )
}

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-stretch'),
  borderRadius('rounded-xl'),
  borderWidth('border'),
  borderColor('border-secondary'),
  padding('p-2')
)
export default function ({ chapter }: { chapter: Chapter }) {
  return (
    <div className={container}>
      {chapter.subchapters.map((subchapter) => (
        <Subchapter chapter={subchapter} key={subchapter.slug} />
      ))}
    </div>
  )
}
