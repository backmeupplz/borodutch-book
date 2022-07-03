import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  fontSize,
  fontWeight,
  margin,
  textColor,
} from 'classnames/tailwind'

const text = classnames(
  textColor('text-primary'),
  fontSize('text-2xl', 'md:text-4xl'),
  fontWeight('font-bold'),
  margin('mb-3', 'md:mb-4')
)
export default function ({ children }: ChildrenProp) {
  return <p className={text}>{children}</p>
}
