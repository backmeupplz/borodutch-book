import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  padding,
  transitionProperty,
} from 'classnames/tailwind'

const container = classnames(
  padding('p-2'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-secondary'),
  cursor('cursor-pointer'),
  backgroundColor(
    'hover:bg-highlighted-background',
    'active:bg-active-background'
  ),
  transitionProperty('transition-colors')
)
export default function ({
  children,
  onClick,
}: ChildrenProp & { onClick: () => void }) {
  return (
    <div className={container} onClick={onClick}>
      {children}
    </div>
  )
}
