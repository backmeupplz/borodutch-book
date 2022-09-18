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

const container = (disabled?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    gap('gap-x-2'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    backgroundColor(
      { 'bg-background': !disabled },
      { 'hover:bg-primary': !disabled },
      { 'active:bg-active-background': !disabled }
    ),
    borderRadius('rounded-full'),
    padding('py-3', 'px-4'),
    textColor(
      { 'text-primary': !disabled },
      { 'hover:text-secondary': !disabled },
      { 'active:text-primary': !disabled },
      { 'text-secondary': disabled }
    ),
    transitionProperty('transition-colors'),
    borderRadius('rounded-full'),
    borderWidth('border'),
    borderColor('border-secondary'),
    cursor(disabled ? 'cursor-not-allowed' : 'cursor-pointer'),
    width('w-64')
  )
export default function ({
  title,
  icon,
  onClick,
  disabled,
}: {
  title: string
  icon?: JSX.Element
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <div
      className={container(disabled)}
      onClick={() => {
        if (disabled) return
        onClick?.()
      }}
    >
      {icon}
      <ButtonText>{title}</ButtonText>
    </div>
  )
}
