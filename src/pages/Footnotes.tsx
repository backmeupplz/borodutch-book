import { Text as IntlText, useText } from 'preact-i18n'
import { Text, Title } from 'components/Text'
import { useSnapshot } from 'valtio'
import Divider from 'components/Divider'
import FootnoteStore from 'stores/FootnoteStore'
import Link from 'components/Link'
import SuspenseWithError from 'components/SuspenseWithError'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  margin,
  maxWidth,
  padding,
} from 'classnames/tailwind'

const footnotesContainer = classnames(
  display('flex'),
  flexDirection('flex-col')
)
function FootnotesSuspended() {
  const { allFootnotes } = useSnapshot(FootnoteStore)
  return (
    <div className={footnotesContainer}>
      {allFootnotes?.map((f, i) =>
        f.url ? (
          <Text key={`${i}`}>
            {i + 1}.{' '}
            <Link url={f.url}>
              <IntlText id="openQuotes" />
              {f.title}
              <IntlText id="closeQuotes" />
            </Link>
          </Text>
        ) : (
          <Text key={`${i}`}>
            {i + 1}. {f.title}
          </Text>
        )
      )}
    </div>
  )
}

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-stretch'),
  gap('gap-y-4'),
  padding('pt-4', 'pb-8'),
  maxWidth('max-w-2xl'),
  margin('mx-auto')
)
export default function () {
  const { errorLoading } = useText('endnotes.errorLoading')
  FootnoteStore.fetchFootnotes()
  return (
    <div className={container}>
      <Title large>
        <IntlText id="endnotes.title" />
      </Title>
      <Divider />
      <SuspenseWithError
        fallback={
          <Text>
            <IntlText id="endnotes.loading" />
          </Text>
        }
        errorText={errorLoading}
      >
        <FootnotesSuspended />
      </SuspenseWithError>
    </div>
  )
}
