import { Text } from 'components/Text'
import { whitespace } from 'classnames/tailwind'
import Chapter from 'models/Chapter'
import Content from 'models/Content'

const noWrap = whitespace('whitespace-nowrap')
function renderChild(child: Content, key: string) {
  if (child.text) {
    return <span key={key}>{child.text}</span>
  }
  if (!child.class) {
    return null
  }
  if (child.class === 'Basic-Paragraph') {
    return (
      <Text fullWidth key={key}>
        {extractChildren(child.children)}
      </Text>
    )
  } else if (child.class === 'No-break') {
    return (
      <span className={noWrap} key={key}>
        {extractChildren(child.children)}
      </span>
    )
  } else {
    return null
  }
}

function extractChildren(contents: readonly Content[] = []) {
  const filtered = contents.filter(
    (content) =>
      !content.class || ['Basic-Paragraph', 'No-break'].includes(content.class)
  )
  return filtered.map((content, i) => renderChild(content, `${i}`))
}

export default function ({ chapter }: { chapter: Chapter }) {
  const children = extractChildren(chapter.beginning)
  return <>{children}</>
}
