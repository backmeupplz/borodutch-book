import { Text, Title } from 'components/Text'
import BookDescription from 'components/BookDescription'
import Divider from 'components/Divider'
import Toc from 'components/Toc'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  maxWidth,
  padding,
} from 'classnames/tailwind'

const main = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-start'),
  gap('gap-8')
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
        <Toc />
      </div>
    </div>
  )
}
