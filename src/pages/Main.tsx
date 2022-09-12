import { Text } from 'components/Text'
import Accent from 'components/Accent'
import Banner from 'components/Banner'
import Link from 'components/Link'
import Summary from 'components/Summary'
import Toc from 'components/Toc'

export default function () {
  return (
    <>
      <Toc />
      <Banner />
      <Text>
        Привет всем<Accent>!</Accent> Это{' '}
        <Link url="https://borodutch.com">Никита</Link>
        <Accent>.</Accent>
      </Text>
      <Text>
        Я написал книгу о том, как резко улучшить свою жизнь на основе научных
        исследований<Accent>!</Accent>
      </Text>
      <Text>
        Книга состоит из четырех частей: счастье с другими, счастье с собой,
        рациональное мышление, достижение успеха<Accent>.</Accent> Ловите
        содержание<Accent>!</Accent>
      </Text>
      <Summary />
      <Text>
        Доступ к книге особенный<Accent>!</Accent>{' '}
        <Link url="https://opensea.io/collection/wdlaty">
          Необходимо купить NFT книги на OpenSea
        </Link>
        <Accent>.</Accent>
      </Text>
      <Text>
        Дальше<Accent>,</Accent> нужно подключить ниже кошелек, который владеет
        хотя бы одним NFT книги<Accent>.</Accent> После <Accent>—</Accent> жмите
        на кнопки форматов, которые хотите скачать, подписывайте сообщение и
        читайте
        <Accent>!</Accent>
      </Text>
      <Text>
        Я вам полностью доверяю, поэтому, пожалуйста, не пиратьте мою книгу
        <Accent>!</Accent> Я не против, чтобы вы дали ее почитать своим
        родственникам, хотя будет еще круче, если вы и им купите экземпляр
        <Accent>!</Accent>
      </Text>
      <Text>
        Остались вопросы или что-то не работает<Accent>?</Accent>{' '}
        <Link url="https://t.me/borodutch">Смело пишите мне в Телеграме</Link>
        <Accent>!</Accent>
      </Text>
    </>
  )
}
