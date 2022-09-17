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
  return (
    <div className={container}>
      <Title large>Приложение</Title>
      <Divider />
    </div>
  )
}
