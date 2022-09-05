import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  fontFamily,
  fontSize,
  fontWeight,
  textColor,
} from 'classnames/tailwind'

const text = classnames(textColor('text-primary'), fontFamily('font-serif'))
export function Text({ children }: ChildrenProp) {
  return <p className={text}>{children}</p>
}

const logoText = classnames(
  textColor('text-primary'),
  fontSize('text-xl'),
  fontWeight('font-bold'),
  fontFamily('font-sans')
)
export function LogoText({ children }: ChildrenProp) {
  return <p className={logoText}>{children}</p>
}
