import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  hardwareAcceleration,
  margin,
  outlineStyle,
  padding,
  scale,
  textColor,
  transitionProperty,
  transitionTimingFunction,
  translate,
} from 'classnames/tailwind'

function button(disabled: boolean, loading: boolean) {
  return classnames(
    padding('px-6', 'py-4'),
    margin('mb-6'),
    backgroundColor(disabled || loading ? 'bg-gray-400' : 'bg-primary'),
    textColor('text-black-background'),
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
    translate(disabled ? undefined : 'hover:translate-x-2'),
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
  loading: boolean
  disabled: boolean
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
