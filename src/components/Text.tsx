import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  fontFamily,
  fontSize,
  fontWeight,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'

const text = classnames(
  textColor('text-primary'),
  fontFamily('font-sans'),
  transitionProperty('transition-colors')
)
export function Text({ children }: ChildrenProp) {
  return <p className={text}>{children}</p>
}

const title = classnames(
  text,
  fontFamily('font-serif'),
  fontWeight('font-bold'),
  fontSize('text-2xl')
)
export function Title({ children }: ChildrenProp) {
  return <h2 className={title}>{children}</h2>
}

const logoText = classnames(
  textColor('text-primary'),
  fontSize('text-xl'),
  fontWeight('font-bold'),
  fontFamily('font-sans'),
  transitionProperty('transition-colors')
)
export function LogoText({ children }: ChildrenProp) {
  return <p className={logoText}>{children}</p>
}
