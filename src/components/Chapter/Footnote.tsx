import { Text } from 'components/Text'
import { Text as TextIntl, useText } from 'preact-i18n'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSnapshot } from 'valtio'
import FootnoteStore from 'stores/FootnoteStore'
import IconButton from 'components/IconButton'
import Loading from 'components/Loading'
import SuspenseWithError from 'components/SuspenseWithError'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderWidth,
  display,
  flexDirection,
  gap,
  inset,
  justifyContent,
  margin,
  maxWidth,
  padding,
  position,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import icon from 'classnames/icon'

function FootnoteTextSuspended({ index }: { index: number }) {
  const { footnotes } = useSnapshot(FootnoteStore)
  const footnote = footnotes[index]
  return footnote ? (
    footnote.url ? (
      <a href={footnote.url} rel="noopener noreferrer" target="_blank">
        <TextIntl id="openQuotes" />
        {footnote.title}
        <TextIntl id="closeQuotes" />
      </a>
    ) : (
      <span>
        <TextIntl id="openQuotes" />
        {footnote.title}
        <TextIntl id="closeQuotes" />
      </span>
    )
  ) : null
}

const container = (visible: boolean) =>
  classnames(
    position('sticky'),
    inset('bottom-0', 'left-0', 'right-0'),
    padding('p-2'),
    borderColor('border-secondary'),
    borderWidth('border-t'),
    zIndex('z-50'),
    backgroundColor('bg-background'),
    transitionProperty('transition-all'),
    display(visible ? 'block' : 'hidden')
  )
const innerContainer = classnames(
  maxWidth('max-w-2xl'),
  margin('mx-auto'),
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  gap('gap-x-2')
)
export default function () {
  const { currentFootnote } = useSnapshot(FootnoteStore)
  if (!currentFootnote) return null
  FootnoteStore.fetchFootnote(currentFootnote)
  const { loading } = useText('endnote.loading')
  const { errorLoading } = useText('endnote.errorLoading')
  return (
    <div className={container(!!currentFootnote)}>
      <div className={innerContainer}>
        <Text>
          {currentFootnote}.{' '}
          <SuspenseWithError
            fallback={<Loading text={loading} />}
            errorText={errorLoading}
          >
            <FootnoteTextSuspended index={currentFootnote} />
          </SuspenseWithError>
        </Text>
        <IconButton
          onClick={() => {
            FootnoteStore.currentFootnote = undefined
          }}
        >
          <XMarkIcon className={icon} />
        </IconButton>
      </div>
    </div>
  )
}
