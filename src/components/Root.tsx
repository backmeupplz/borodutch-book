import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const root = classnames(
  'container',
  'mx-auto',
  'pb-10',
  'max-w-4xl',
  'p-4',
  'md:py-8'
)
const Root: FC = ({ children }) => {
  return <div className={root}>{children}</div>
}

export default Root
