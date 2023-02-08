import { Link } from 'wouter'
import { Text } from 'components/Text'
import { useSnapshot } from 'valtio'
import Chapter from 'models/Chapter'
import ChapterStore from 'stores/ChapterStore'
import ChildrenProp from 'models/ChildrenProp'
import CompatibilityStore from 'stores/CompatibilityStore'
import Divider from 'components/Divider'
import FreeSlugsStore from 'stores/FreeSlugsStore'
import LanguageStore from 'stores/LanguageStore'
import LockedIcon from 'components/LockedIcon'
import SignatureStore from 'stores/SignatureStore'
import UpRightIcon from 'components/UpRightIcon'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  flexDirection,
  gap,
  justifyContent,
  opacity,
  overflow,
  padding,
  transitionProperty,
} from 'classnames/tailwind'
import flattenToc from 'helpers/flattenToc'

const subchapterContainer = (padded: boolean, disabled: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent('justify-start'),
    alignItems('items-center'),
    padding('p-2'),
    gap('gap-x-2'),
    backgroundColor({
      'hover:bg-highlighted-background': !disabled,
      'active:bg-active-background': !disabled,
    }),
    padding({ 'pl-4': padded }),
    transitionProperty('transition-colors'),
    opacity({ 'opacity-50': disabled }),
    cursor({
      'cursor-not-allowed': disabled,
    })
  )
const subSubchapterContainer = classnames(
  display('flex'),
  flexDirection('flex-col')
)

function TitleContainer({
  chapter,
  children,
  disabled,
}: { chapter: Chapter; disabled: boolean } & ChildrenProp) {
  return disabled ? (
    <div className={subchapterContainer(chapter.level > 1, disabled)}>
      {children}
    </div>
  ) : (
    <Link
      className={subchapterContainer(chapter.level > 1, disabled)}
      href={`#/${chapter.slug}`}
    >
      {children}
    </Link>
  )
}

function Subchapter({
  chapter,
  divider,
}: {
  chapter: Chapter
  divider: boolean
}) {
  const { freeSlugs } = useSnapshot(FreeSlugsStore)
  const { language } = useSnapshot(LanguageStore)
  const { signatures } = useSnapshot(SignatureStore)
  const signature = signatures[language]

  const { toc } = useSnapshot(ChapterStore)
  const tocFlat = flattenToc(toc[language])
  const { lastReadySlugs } = useSnapshot(CompatibilityStore)
  const lastReadySlug = lastReadySlugs[language]
  const lastReadySlugIndex = lastReadySlug
    ? tocFlat.findIndex((item) => item.slug === lastReadySlug)
    : tocFlat.length - 1
  const index = tocFlat.findIndex((item) => item.slug === chapter.slug)
  const disabled = index > lastReadySlugIndex
  return (
    <>
      <TitleContainer chapter={chapter} disabled={disabled}>
        <Text>{chapter.title}</Text>
        {!disabled && <UpRightIcon />}
        {!signature && !freeSlugs.includes(chapter.slug) && <LockedIcon />}
      </TitleContainer>
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
