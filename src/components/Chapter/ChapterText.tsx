import { Text, text } from 'components/Text'
import Chapter from 'models/Chapter'
import Content from 'models/Content'
import classnames, {
  cursor,
  listStylePosition,
  listStyleType,
  margin,
  textColor,
  textDecoration,
  transitionProperty,
  whitespace,
} from 'classnames/tailwind'

const noWrap = whitespace('whitespace-nowrap')
const unorderedList = classnames(
  listStyleType('list-disc'),
  listStylePosition('list-inside'),
  margin('my-1')
)
const orderedList = classnames(unorderedList, listStyleType('list-decimal'))
const superscript = classnames(
  textDecoration('underline'),
  textColor('hover:text-primary-highlighted', 'active:text-primary-active'),
  cursor('cursor-pointer'),
  margin('ml-0.5'),
  transitionProperty('transition-colors')
)
function renderChild(child: Content, key: string) {
  if (child.text) {
    return <span key={key}>{child.text}</span>
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
  } else if (child.class === 'Bullet-list' || child.class === 'Numbered-list') {
    return <li className={text()}>{extractChildren(child.children)}</li>
  } else if (child.class === 'CharOverride-2') {
    return (
      <sup className={superscript}>
        {child.children?.[0].children?.[0].children?.[0].children?.[0].text}
      </sup>
    )
  } else if (child.tagName === 'UL') {
    return (
      <ul key={key} className={unorderedList}>
        {extractChildren(child.children)}
      </ul>
    )
  } else if (child.tagName === 'OL') {
    return (
      <ol key={key} className={orderedList}>
        {extractChildren(child.children)}
      </ol>
    )
  } else {
    return null
  }
}

function extractChildren(contents: readonly Content[] = []) {
  const filtered = contents.filter(
    (content) =>
      !content.class ||
      [
        'Basic-Paragraph',
        'No-break',
        'Bullet-list',
        'Numbered-list',
        'CharOverride-2',
      ].includes(content.class)
  )
  return filtered.map((content, i) => renderChild(content, `${i}`))
}

export default function ({ chapter }: { chapter: Chapter }) {
  const children = extractChildren(chapter.beginning)
  return <>{children}</>
}
