import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  textAlign,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'

export const text = (fullWidth?: boolean) =>
  classnames(
    fontSize('sm:text-lg'),
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

const exampleText = classnames(
  text(),
  fontStyle('italic'),
  textAlign('text-right')
)
export function ExampleText({ children }: ChildrenProp) {
  return <p className={exampleText}>{children}</p>
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
    fontSize(
      large ? 'text-2xl' : 'text-xl',
      large ? 'sm:text-4xl' : 'sm:text-2xl'
    ),
    textAlign({
      'text-center': large,
    })
  )
export function Title({ children, large }: ChildrenProp & { large?: boolean }) {
  return <h2 className={title(large)}>{children}</h2>
}

const subtitle = classnames(
  textColor('text-primary'),
  transitionProperty('transition-colors'),
  fontFamily('font-serif'),
  fontWeight('font-bold'),
  fontSize('text-lg', 'sm:text-2xl'),
  textAlign('text-center')
)
export function Subtitle({ children }: ChildrenProp) {
  return <h3 className={subtitle}>{children}</h3>
}

const heading = classnames(
  fontSize('text-lg', 'sm:text-xl'),
  textColor('text-primary'),
  fontFamily('font-serif'),
  fontWeight('font-bold'),
  transitionProperty('transition-colors')
)
export function Heading({ children }: ChildrenProp) {
  return <h4 className={heading}>{children}</h4>
}

const subheading = classnames(
  fontSize('sm:text-lg'),
  textColor('text-primary'),
  fontFamily('font-sans'),
  fontWeight('font-bold'),
  fontStyle('italic'),
  transitionProperty('transition-colors')
)
export function Subheading({ children }: ChildrenProp) {
  return <h5 className={subheading}>{children}</h5>
}

const linedTitle = classnames(
  textColor('text-primary'),
  fontFamily('font-sans'),
  transitionProperty('transition-colors'),
  fontWeight('font-bold'),
  fontSize('text-lg', 'sm:text-xl')
)
export function LinedTitle({ children }: ChildrenProp) {
  return <h4 className={linedTitle}>{children}</h4>
}

const linedText = classnames(
  fontSize('sm:text-lg'),
  textColor('text-primary'),
  fontFamily('font-sans'),
  transitionProperty('transition-colors'),
  textAlign('text-justify')
)
export function LinedText({ children }: ChildrenProp) {
  return <p className={linedText}>{children}</p>
}

const logoText = classnames(
  textColor('text-primary'),
  fontSize('text-lg', 'sm:text-xl'),
  fontWeight('font-bold'),
  fontFamily('font-sans'),
  transitionProperty('transition-colors')
)
export function LogoText({ children }: ChildrenProp) {
  return <p className={logoText}>{children}</p>
}
