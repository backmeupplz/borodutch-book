import { FC } from 'react'
import {
  backgroundColor,
  classnames,
  container,
  margin,
  maxWidth,
  padding,
} from 'classnames/tailwind'

const root = classnames(
  container('container'),
  margin('mx-auto'),
  padding('p-4', 'pb-10', 'md:py-8'),
  maxWidth('max-w-4xl'),
  backgroundColor('bg-black-background')
)
const Root: FC = ({ children }) => {
  return <div className={root}>{children}</div>
}

export default Root
