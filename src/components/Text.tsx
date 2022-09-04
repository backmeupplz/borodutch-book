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
export function Text({ children }: ChildrenProp) {
  return <p className={text}>{children}</p>
}

const logoText = classnames(
  textColor('text-primary'),
  fontSize('text-xl'),
  fontWeight('font-bold')
)
export function LogoText({ children }: ChildrenProp) {
  return <p className={logoText}>{children}</p>
}
