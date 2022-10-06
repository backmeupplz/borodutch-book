import { Text as IntlText, useText } from 'preact-i18n'
import { Text, Title } from 'components/Text'
import { useEffect } from 'preact/hooks'
import BookDescription from 'components/BookDescription'
import Divider from 'components/Divider'
import Link from 'components/Link'
import MetadataStore from 'stores/MetadataStore'
import Toc from 'components/Toc'
import WalletBlock from 'components/WalletBlock'
import bookTitle from 'helpers/bookTitle'
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

const main = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-start'),
  gap('gap-8'),
  margin('mx-auto')
)
const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-stretch'),
  gap('gap-y-4'),
  padding('pt-4', 'pb-8'),
  maxWidth('max-w-2xl')
)
export default function () {
  useEffect(() => {
    MetadataStore.title = bookTitle.long
  }, [])
  const { text1 } = useText('description.text1')
  const { text2 } = useText('description.text2')
  const { text3 } = useText('description.text3')
  const { text4 } = useText('description.text4')
  const texts = [text1, text2, text3, text4].filter((v) => !!v)

  return (
    <div class={main}>
      <BookDescription />
      <div className={container}>
        <Title>
          <IntlText id="description.title" />
        </Title>
        {texts.map((paragraph, index) => (
          <Text key={index}>{paragraph}</Text>
        ))}
        <Divider />
        <WalletBlock />
        <Divider />
        <Toc />
        <Divider />
        <Text>
          <Link url="https://github.com/backmeupplz/borodutch-book-backend">
            <IntlText id="footer.server" />
          </Link>{' '}
          <IntlText id="footer.and" />{' '}
          <Link url="https://github.com/backmeupplz/borodutch-book">
            <IntlText id="footer.website" />
          </Link>{' '}
          <IntlText id="footer.open" />
        </Text>
      </div>
    </div>
  )
}
