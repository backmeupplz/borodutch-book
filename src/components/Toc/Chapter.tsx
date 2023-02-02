import { Link } from 'wouter'
import { Title } from 'components/Text'
import Chapter from 'models/Chapter'
import ChildrenProp from 'models/ChildrenProp'
import Subchapters from 'components/Toc/Subchapters'
import UpRightIcon from 'components/UpRightIcon'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
  justifyContent,
  opacity,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch'),
  gap('gap-y-2')
)
const titleContainer = (disabled: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent('justify-start'),
    alignItems('items-center'),
    gap('gap-x-2'),
    cursor({
      'cursor-not-allowed': disabled,
    }),
    opacity({ 'opacity-50': disabled })
  )

function TitleContainer({
  children,
  chapter,
  disabled,
}: ChildrenProp & { chapter: Chapter; disabled: boolean }) {
  return disabled ? (
    <div className={titleContainer(disabled)}>{children}</div>
  ) : (
    <Link className={titleContainer(disabled)} href={`#/${chapter.slug}`}>
      {children}
    </Link>
  )
}

export default function ({
  chapter,
  disabled,
}: {
  chapter: Chapter
  disabled: boolean
}) {
  return (
    <div className={container}>
      <TitleContainer chapter={chapter} disabled={disabled}>
        <Title>{chapter.title}</Title>
        {!disabled && <UpRightIcon />}
      </TitleContainer>
      {!!chapter.subchapters?.length && <Subchapters chapter={chapter} />}
    </div>
  )
}
