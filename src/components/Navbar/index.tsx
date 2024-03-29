import { Link, useLocation } from 'wouter'
import { LogoText } from 'components/Text'
import { Text, useText } from 'preact-i18n'
import Image from 'components/Image'
import LanguageButton from 'components/Navbar/LanguageButton'
import ProgressBar from 'components/Navbar/ProgressBar'
import Separator from 'components/Navbar/Separator'
import ShareButton from 'components/Navbar/ShareButton'
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
  gap('gap-x-1', 'sm:gap-x-2')
)
const hiddenOnMobile = classnames(display('hidden', 'sm:block'))
export default function () {
  const [location] = useLocation()
  const isChapter = location !== '/'
  const { logoAlt } = useText('logoAlt')
  return (
    <div className={container} id="navbar">
      <div className={content}>
        <Link href="#/" className={logo}>
          <div className={hiddenOnMobile}>
            <Image
              src="/icons/logo.webp"
              width="40"
              height="40"
              alt={logoAlt}
            />
          </div>
          <LogoText>
            <Text id="title.full" />
          </LogoText>
        </Link>
        <div className={buttons}>
          {isChapter && <ShareButton />}
          <ThemeToggle />
          <LanguageButton />
        </div>
      </div>
      {isChapter && <ProgressBar />}
      <Separator />
    </div>
  )
}
