import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'

export const text = (fullWidth?: boolean) =>
  classnames(
    fontSize('text-lg'),
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

const boldText = classnames(text(), fontWeight('font-bold'))
export function BoldText({ children }: ChildrenProp) {
  return <p className={boldText}>{children}</p>
}

const buttonText = classnames(
  fontFamily('font-sans'),
  transitionProperty('transition-colors'),
  fontWeight('font-bold')
)
export function ButtonText({ children }: ChildrenProp) {
  return <p className={buttonText}>{children}</p>
}

const title = (large?: boolean) =>
  classnames(
    textColor('text-primary'),
    fontFamily('font-sans'),
    transitionProperty('transition-colors'),
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
