import {
  backgroundColor,
  classnames,
  container,
  display,
  flexDirection,
  gap,
  margin,
  maxWidth,
  padding,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const root = classnames(
  container('container'),
  maxWidth('max-w-4xl'),
  margin('mx-auto'),
  padding('py-4'),
  backgroundColor('bg-background'),
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-2'),
  padding('px-4')
)
export default function ({ children }: ChildrenProp) {
  return <div className={root}>{children}</div>
}
