import { textColor } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const accent = textColor('text-yellow-600')
export default function ({ children }: ChildrenProp) {
  return <span className={accent}>{children}</span>
}
