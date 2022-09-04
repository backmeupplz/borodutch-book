import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  padding,
} from 'classnames/tailwind'

const container = classnames(
  padding('p-2'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-sky-900'),
  cursor('cursor-pointer'),
  backgroundColor('hover:bg-sky-100', 'active:bg-slate-200')
)
export default function ({ children }: ChildrenProp) {
  return <div className={container}>{children}</div>
}
