import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  borderColor,
  borderWidth,
  display,
  flexDirection,
  gap,
  padding,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-1'),
  borderWidth('border-l-8'),
  borderColor('border-primary'),
  padding('pl-4')
)
export default function ({ children }: ChildrenProp) {
  return <div className={container}>{children}</div>
}
