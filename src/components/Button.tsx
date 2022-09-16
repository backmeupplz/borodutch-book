import { ButtonText } from 'components/Text'
import { JSX } from 'preact/jsx-runtime'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-2'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  backgroundColor(
    'bg-background',
    'hover:bg-primary',
    'active:bg-active-background'
  ),
  borderRadius('rounded-full'),
  padding('py-2', 'px-4'),
  textColor('text-primary', 'hover:text-secondary', 'active:text-primary'),
  transitionProperty('transition-colors'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-secondary'),
  cursor('cursor-pointer'),
  width('w-64'),
  padding('py-3')
)
export default function ({
  title,
  icon,
  onClick,
}: {
  title: string
  icon?: JSX.Element
  onClick?: () => void
}) {
  return (
    <div className={container} onClick={() => onClick?.()}>
      {icon}
      <ButtonText>{title}</ButtonText>
    </div>
  )
}
