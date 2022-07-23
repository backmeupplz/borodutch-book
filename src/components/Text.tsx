import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  fontSize,
  fontWeight,
  textColor,
} from 'classnames/tailwind'

const text = classnames(
  textColor('text-primary'),
  fontSize('text-2xl', 'md:text-4xl'),
  fontWeight('font-bold')
)
export default function ({ children }: ChildrenProp) {
  return <p className={text}>{children}</p>
}
