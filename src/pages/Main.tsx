import { Text, Title } from 'components/Text'
import BookDescription from 'components/BookDescription'
import Divider from 'components/Divider'
import Link from 'components/Link'
import Toc from 'components/Toc'
import Wallet from 'components/Wallet'
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
          мышление и рзавитие собственного дела.
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
        <Text>
          Часть книги доступна бесплатно, но для того, чтобы получить доступ к
          большинству глав и загрузке файлов,{' '}
          <Link url="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/86597206928702930307486193712987064466367043993614253349341663474748447785515">
            необходимо купить токен книги на OpenSea
          </Link>{' '}
          и подключить свой кошелек к этому сайту.
        </Text>
        <Wallet />
        <Divider />
        <Toc />
      </div>
    </div>
  )
}
