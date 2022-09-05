import { ListBulletIcon } from '@heroicons/react/24/solid'
import { LogoText } from 'components/Text'
import IconButton from 'components/IconButton'
import Image from 'components/Image'
import Separator from 'components/Navbar/Separator'
import ThemeToggle from 'components/Navbar/ThemeToggle'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  flexDirection,
  gap,
  inset,
  justifyContent,
  padding,
  position,
  transitionProperty,
} from 'classnames/tailwind'
import icon from 'classnames/icon'

const container = classnames(
  position('sticky'),
  inset('top-0'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch'),
  justifyContent('justify-center'),
  backgroundColor('bg-background'),
  transitionProperty('transition-colors')
)
const content = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  padding('px-8', 'py-4')
)
const logo = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  gap('gap-x-4')
)
const buttons = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  gap('gap-x-2')
)
export default function () {
  return (
    <div className={container}>
      <div className={content}>
        <div className={logo}>
          <Image src="/icons/logo.svg" alt="Logo" />
          <LogoText>We Don't Live a Thousand Years</LogoText>
        </div>
        <div className={buttons}>
          <ThemeToggle />
          <IconButton
            onClick={() => {
              console.log('Menu clicked')
            }}
          >
            <ListBulletIcon className={icon} />
          </IconButton>
        </div>
      </div>
      <Separator />
    </div>
  )
}
