import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'

const text = (fullWidth?: boolean) =>
  classnames(
    textColor('text-primary'),
    fontFamily('font-sans'),
    transitionProperty('transition-colors'),
    textAlign({
      'text-justify': fullWidth,
    })
  )
export function Text({
  children,
  fullWidth,
}: ChildrenProp & { fullWidth?: boolean }) {
  return <p className={text(fullWidth)}>{children}</p>
}

const title = (large?: boolean) =>
  classnames(
    text(),
    fontFamily('font-serif'),
    fontWeight('font-bold'),
    fontSize(large ? 'text-4xl' : 'text-2xl'),
    textAlign({
      'text-center': large,
    })
  )
export function Title({ children, large }: ChildrenProp & { large?: boolean }) {
  return <h2 className={title(large)}>{children}</h2>
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
