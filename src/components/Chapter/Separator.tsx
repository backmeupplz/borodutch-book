import { Title } from 'components/Text'
import Divider from 'components/Divider'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  gap('gap-x-4')
)
const stars = margin('mt-1')
export default function () {
  return (
    <div className={container}>
      <Divider />
      <div className={stars}>
        <Title>***</Title>
      </div>
      <Divider />
    </div>
  )
}
