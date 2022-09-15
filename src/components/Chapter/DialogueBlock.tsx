import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, flexDirection } from 'classnames/tailwind'

const container = classnames(display('flex'), flexDirection('flex-col'))
export default function ({ children }: ChildrenProp) {
  return <div className={container}>{children}</div>
}
