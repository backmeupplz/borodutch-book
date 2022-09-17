import { Link, useLocation } from 'wouter'
import { ListBulletIcon } from '@heroicons/react/24/solid'
import { LogoText } from 'components/Text'
import IconButton from 'components/IconButton'
import Image from 'components/Image'
import ProgressBar from 'components/Navbar/ProgressBar'
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
  zIndex,
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
  transitionProperty('transition-colors'),
  zIndex('z-50')
)
const content = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  padding('px-2', 'sm:px-8', 'py-2', 'sm:py-4')
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
  const [location] = useLocation()
  const isChapter = location !== '/'
  return (
    <div className={container}>
      <div className={content}>
        <Link href="/" className={logo}>
          <Image src="/icons/logo.svg" alt="Logo" />
          <LogoText>Не Тысячу Лет Живем</LogoText>
        </Link>
        <div className={buttons}>
          <ThemeToggle />
          {/* <IconButton
            onClick={() => {
              console.log('Menu clicked')
            }}
          >
            <ListBulletIcon className={icon} />
          </IconButton> */}
        </div>
      </div>
      {isChapter && <ProgressBar />}
      <Separator />
    </div>
  )
}
