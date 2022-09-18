import { Link } from 'wouter'
import { Text } from 'components/Text'
import { useSnapshot } from 'valtio'
import Chapter from 'models/Chapter'
import Divider from 'components/Divider'
import FreeSlugsStore from 'stores/FreeSlugsStore'
import LockedIcon from 'components/LockedIcon'
import SignatureStore from 'stores/SignatureStore'
import UpRightIcon from 'components/UpRightIcon'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  gap,
  justifyContent,
  overflow,
  padding,
  transitionProperty,
} from 'classnames/tailwind'

const subchapterContainer = (padded: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent('justify-start'),
    alignItems('items-center'),
    padding('p-2'),
    gap('gap-x-2'),
    backgroundColor(
      'hover:bg-highlighted-background',
      'active:bg-active-background'
    ),
    padding({ 'pl-4': padded }),
    transitionProperty('transition-colors')
  )
const subSubchapterContainer = classnames(
  display('flex'),
  flexDirection('flex-col')
)
function Subchapter({
  chapter,
  divider,
}: {
  chapter: Chapter
  divider: boolean
}) {
  const { freeSlugs } = useSnapshot(FreeSlugsStore)
  const { signature } = useSnapshot(SignatureStore)
  return (
    <>
      <Link
        className={subchapterContainer(chapter.level > 1)}
        href={`/${chapter.slug}`}
      >
        <Text>{chapter.title}</Text>
        <UpRightIcon />
        {!signature && !freeSlugs.includes(chapter.slug) && <LockedIcon />}
      </Link>
      {!!chapter.subchapters?.length && <Divider />}
      {!!chapter.subchapters?.length && (
        <div className={subSubchapterContainer}>
          {chapter.subchapters?.map((subchapter, i, subchapters) => (
            <Subchapter
              chapter={subchapter}
              divider={i < subchapters.length - 1}
            />
          ))}
        </div>
      )}
      {divider && <Divider />}
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
  overflow('overflow-hidden')
)
export default function ({ chapter }: { chapter: Chapter }) {
  return (
    <div className={container}>
      {chapter.subchapters?.map((subchapter, i, subchapters) => (
        <Subchapter
          chapter={subchapter}
          key={subchapter.slug}
          divider={i < subchapters.length - 1}
        />
      ))}
    </div>
  )
}
