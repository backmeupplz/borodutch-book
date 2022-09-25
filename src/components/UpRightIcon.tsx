import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import classnames, {
  borderColor,
  borderRadius,
  borderWidth,
  height,
  padding,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const iconContainer = classnames(
  padding('p-1'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-secondary'),
  transitionProperty('transition-colors')
)
const icon = classnames(textColor('text-primary'), width('w-3'), height('h-3'))
export default function () {
  return (
    <div className={iconContainer}>
      <ArrowUpRightIcon className={icon} />
    </div>
  )
}
