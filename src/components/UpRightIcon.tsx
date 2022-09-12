import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import baseIcon from 'classnames/icon'
import classnames, {
  borderColor,
  borderRadius,
  borderWidth,
  height,
  padding,
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
const icon = classnames(baseIcon, width('w-3'), height('h-3'))
export default function () {
  return (
    <div className={iconContainer}>
      <ArrowUpRightIcon className={icon} />
    </div>
  )
}
