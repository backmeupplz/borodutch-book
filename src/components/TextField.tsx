import { JSX } from 'preact/compat'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  margin,
  outlineStyle,
  padding,
  placeholderColor,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'

const textField = classnames(
  padding('px-6', 'py-4'),
  margin('my-4', 'mr-4'),
  backgroundColor('bg-transparent'),
  borderWidth('border'),
  borderColor('border-gray-400', 'focus:border-primary'),
  transitionProperty('transition-colors'),
  borderRadius('rounded'),
  textColor('text-primary'),
  outlineStyle('focus:outline-none'),
  placeholderColor('placeholder-gray-400')
)

export default function ({
  type,
  placeholder,
  value,
  onInput,
  disabled,
}: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onInput={onInput}
      disabled={disabled}
      className={textField}
    />
  )
}
