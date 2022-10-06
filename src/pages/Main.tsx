import { Text as IntlText } from 'preact-i18n'
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

  return (
    <div class={main}>
      <BookDescription />
      <div className={container}>
        <Title>Описание</Title>
        <Text>
          Последние 10 лет я провел в поисках и разборах научных исследований о
          том, как улучшить свою жизнь. Я выделил четыре сферы жизни, в которых
          необходимо достичь дзена для того, чтобы стать максимально
          счастливыми: отношения с другими, отношения с собой, рациональное
          мышление и развитие собственного дела.
        </Text>
        <Text>
          В этой книге я собрал все практические советы, которые почерпнул из
          тех прочитанных исследований, чтобы вам не пришлось снова проходить
          мой путь проб и ошибок. Будьте готовы к качественному скачку,
          пристегните ремни, мы входим в гиперпространство!
        </Text>
        <Text>
          P.S., каждая из глав и подглав книги на этом сайте имеет уникальную
          ссылку — не стесняйтесь делиться ими с друзьями, семьей и знакомыми!
        </Text>
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
