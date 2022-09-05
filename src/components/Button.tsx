import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  TTranslate,
  animation,
  backgroundColor,
  borderRadius,
  cursor,
  hardwareAcceleration,
  outlineStyle,
  padding,
  scale,
  textColor,
  transitionProperty,
  transitionTimingFunction,
  translate,
} from 'classnames/tailwind'

function button(disabled?: boolean, loading?: boolean) {
  return classnames(
    padding('px-6', 'py-4'),
    backgroundColor(disabled || loading ? 'bg-gray-400' : 'bg-primary'),
    textColor('text-primary'),
    borderRadius('rounded'),
    cursor(
      loading
        ? 'cursor-wait'
        : disabled
        ? 'cursor-not-allowed'
        : 'cursor-pointer'
    ),
    outlineStyle('focus:outline-none'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    scale(disabled ? undefined : 'hover:scale-110'),
    translate(disabled ? undefined : ('-hover:translate-x-2' as TTranslate)),
    hardwareAcceleration('transform-gpu')
  )
}

export default function ({
  onClick,
  children,
  loading,
  disabled,
}: {
  onClick: () => void
  loading?: boolean
  disabled?: boolean
} & ChildrenProp) {
  return (
    <button
      className={button(disabled, loading)}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {children}
      {loading && ' 🤔'}
    </button>
  )
}
