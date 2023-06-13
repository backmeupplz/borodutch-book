import {
  ExampleText,
  Heading,
  LinedText,
  LinedTitle,
  Subheading,
  Subtitle,
  Text,
  linedText,
  text,
} from 'components/Text'
import Chapter from 'models/Chapter'
import Content from 'models/Content'
import DialogueBlock from 'components/Chapter/DialogueBlock'
import FootnoteStore from 'stores/FootnoteStore'
import HashLink from 'components/Chapter/HashLink'
import LinedBlock from 'components/Chapter/LinedBlock'
import Separator from 'components/Chapter/Separator'
import classnames, {
  cursor,
  display,
  flexDirection,
  gap,
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
  display('flex'),
  flexDirection('flex-col'),
  listStyleType('list-disc'),
  listStylePosition('list-inside'),
  margin('my-1'),
  gap('gap-y-1')
)
const orderedList = classnames(unorderedList, listStyleType('list-decimal'))
const superscript = classnames(
  margin('ml-0.5'),
  transitionProperty('transition-colors')
)
const superscriptLink = classnames(
  textDecoration('underline'),
  textColor('hover:text-primary-highlighted', 'active:text-primary-active'),
  cursor('cursor-pointer'),
  transitionProperty('transition-colors')
)
function renderChild(child: Content, key: string) {
  if (child.text) {
    return <span key={key}>{child.text}</span>
  }
  if (child.class?.includes('Basic-Paragraph')) {
    return (
      <Text fullWidth key={key}>
        {extractChildren(child.children)}
      </Text>
    )
  } else if (child.class?.includes('No-break')) {
    return (
      <span className={noWrap} key={key}>
        {extractChildren(child.children)}
      </span>
    )
  } else if (
    child.class?.includes('Bullet-list') ||
    child.class?.includes('Numbered-list')
  ) {
    return <li className={text(true)}>{extractChildren(child.children)}</li>
  } else if (child.class?.includes('CharOverride-4')) {
    return (
      <sup className={superscript}>
        {child.children?.map((supChild, i) =>
          supChild.text ? (
            <span key={`${i}`}>{supChild.text}</span>
          ) : (
            <span
              key={`${i}`}
              className={superscriptLink}
              onClick={() => {
                if (supChild.children?.[0].children?.[0].children?.[0].text) {
                  FootnoteStore.currentFootnote =
                    +supChild.children?.[0].children?.[0].children?.[0].text
                }
              }}
            >
              {supChild.children?.[0].children?.[0].children?.[0].text}
            </span>
          )
        )}
      </sup>
    )
  } else if (child.class?.includes('Subheading')) {
    return <Subtitle>{extractChildren(child.children)}</Subtitle>
  } else if (child.class?.includes('Lined-block')) {
    return <LinedBlock>{extractChildren(child.children)}</LinedBlock>
  } else if (child.class?.includes('Lined-title-parsed')) {
    return <LinedTitle>{extractChildren(child.children)}</LinedTitle>
  } else if (child.class?.includes('Lined-parsed')) {
    return <LinedText>{extractChildren(child.children)}</LinedText>
  } else if (child.class?.includes('Lined-bullet-wrapper')) {
    return <ul className={unorderedList}>{extractChildren(child.children)}</ul>
  } else if (child.class?.includes('Lined-bullet')) {
    return <li className={linedText}>{extractChildren(child.children)}</li>
  } else if (child.class?.includes('Dialogue-block')) {
    return <DialogueBlock>{extractChildren(child.children)}</DialogueBlock>
  } else if (child.class?.includes('Dialogue-parsed')) {
    return <Text>{extractChildren(child.children)}</Text>
  } else if (child.class?.includes('Separator')) {
    return <Separator />
  } else if (child.class?.includes('Heading-4')) {
    return (
      <Heading>
        <a id={child.slug}>{extractChildren(child.children)}</a>{' '}
        {child.slug && <HashLink slug={child.slug} />}
      </Heading>
    )
  } else if (child.class?.includes('Heading-5')) {
    return (
      <Subheading>
        <a id={child.slug}>{extractChildren(child.children)}</a>{' '}
        {child.slug && <HashLink slug={child.slug} />}
      </Subheading>
    )
  } else if (child.class?.includes('Example')) {
    return <ExampleText>{extractChildren(child.children)}</ExampleText>
  } else if (child.tagName?.includes('UL')) {
    return (
      <ul key={key} className={unorderedList}>
        {extractChildren(child.children)}
      </ul>
    )
  } else if (child.tagName?.includes('OL')) {
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
  const allowedClasses = [
    'Basic-Paragraph',
    'No-break',
    'Bullet-list',
    'Numbered-list',
    'CharOverride-4',
    'Subheading',
    'Lined-title',
    'Lined-title-parsed',
    'Lined',
    'Lined-parsed',
    'Lined-bullet',
    'Lined-bullet-wrapper',
    'Dialogue',
    'Dialogue-block',
    'Dialogue-parsed',
    'Separator',
    'Heading-4',
    'Heading-5',
    'Example',
  ]
  const allowedClassesRegex = new RegExp(allowedClasses.join('|'), 'i')
  const filtered = contents.filter(
    (content) => !content.class || allowedClassesRegex.test(content.class)
  )
  const result = [] as Content[]
  let currentLinedBlock:
    | {
        class: string
        children: Content[]
      }
    | undefined
  let currentDialogueBlock:
    | {
        class: string
        children: Content[]
      }
    | undefined
  for (const content of filtered) {
    if (content.class === 'Lined-title') {
      currentLinedBlock = {
        class: 'Lined-block',
        children: [
          {
            class: 'Lined-title-parsed',
            children: content.children,
          },
        ],
      }
    } else if (content.class === 'Lined') {
      currentLinedBlock?.children?.push({
        class: 'Lined-parsed',
        children: content.children,
      })
      if (
        currentLinedBlock &&
        filtered.indexOf(content) === filtered.length - 1
      ) {
        result.push(currentLinedBlock)
        currentLinedBlock = undefined
      }
    } else if (
      content.tagName === 'UL' &&
      content.children
        ?.map((c) => c.class?.toLowerCase())
        .some((c) => c?.includes('lined'))
    ) {
      currentLinedBlock?.children?.push({
        class: 'Lined-bullet-wrapper',
        children: content.children,
      })
      if (
        currentLinedBlock &&
        filtered.indexOf(content) === filtered.length - 1
      ) {
        result.push(currentLinedBlock)
        currentLinedBlock = undefined
      }
    } else if (content.class === 'Dialogue') {
      if (currentDialogueBlock) {
        currentDialogueBlock.children?.push({
          class: 'Dialogue-parsed',
          children: content.children,
        })
        if (filtered.indexOf(content) === filtered.length - 1) {
          result.push(currentDialogueBlock)
          currentDialogueBlock = undefined
        }
      } else {
        currentDialogueBlock = {
          class: 'Dialogue-block',
          children: [
            {
              class: 'Dialogue-parsed',
              children: content.children,
            },
          ],
        }
      }
    } else {
      if (currentLinedBlock) {
        result.push(currentLinedBlock)
        currentLinedBlock = undefined
      }
      if (currentDialogueBlock) {
        result.push(currentDialogueBlock)
        currentDialogueBlock = undefined
      }
      result.push(content)
    }
  }
  return result.map((content, i) => renderChild(content, `${i}`))
}

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
export default function ({ chapter }: { chapter: Chapter }) {
  const children = extractChildren(
    chapter.beginning.length ? chapter.beginning : chapter.content
  )
  return <div className={container}>{children}</div>
}
