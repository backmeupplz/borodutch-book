import {
  backgroundColor,
  classnames,
  container,
  margin,
  maxWidth,
  padding,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const root = classnames(
  container('container'),
  margin('mx-auto'),
  padding('p-4', 'pb-10', 'md:py-8'),
  maxWidth('max-w-4xl'),
  backgroundColor('bg-black-background')
)
export default function ({ children }: ChildrenProp) {
  return <div className={root}>{children}</div>
}
