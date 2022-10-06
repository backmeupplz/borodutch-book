import { Text } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useText } from 'preact-i18n'

const container = margin('my-2')

export default function ({ text }: { text?: string }) {
  const { loading } = useText('loading')
  return (
    <div className={container}>
      <Text>{text || loading}</Text>
    </div>
  )
}
