import { ButtonText } from 'components/Text'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'wouter'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  height,
  padding,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-2'),
  alignItems('items-center'),
  backgroundColor(
    'bg-primary',
    'hover:bg-secondary',
    'active:bg-active-background'
  ),
  borderRadius('rounded-full'),
  padding('py-2', 'px-4'),
  textColor('text-secondary', 'hover:text-primary'),
  transitionProperty('transition-colors')
)
const icon = classnames(width('w-4'), height('h-4'))
export default function ({ slug }: { slug: string }) {
  return (
    <Link className={container} href={`#/${slug}`}>
      <ButtonText>Вперед</ButtonText>
      <ChevronRightIcon className={icon} />
    </Link>
  )
}
