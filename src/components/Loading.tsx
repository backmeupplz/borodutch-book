import { Text } from 'components/Text'
import { margin } from 'classnames/tailwind'

const container = margin('my-2')

export default function ({ text }: { text?: string }) {
  return (
    <div className={container}>
      <Text>{text || 'Loading...'}</Text>
    </div>
  )
}
