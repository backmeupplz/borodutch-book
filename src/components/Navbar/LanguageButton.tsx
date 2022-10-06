import { LanguageIcon } from '@heroicons/react/24/outline'
import { Text } from 'components/Text'
import { useState } from 'preact/hooks'
import Divider from 'components/Divider'
import IconButton from 'components/IconButton'
import LanguageStore from 'stores/LanguageStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  flexDirection,
  inset,
  justifyContent,
  overflow,
  padding,
  position,
  textAlign,
  transitionProperty,
} from 'classnames/tailwind'
import icon from 'classnames/icon'

const container = classnames(position('relative'))
const menuContainer = (visible: boolean) =>
  classnames(
    position('absolute'),
    inset('top-12', 'right-0'),
    display(visible ? 'flex' : 'hidden'),
    flexDirection('flex-col'),
    backgroundColor('bg-background'),
    borderRadius('rounded-xl'),
    borderWidth('border'),
    borderColor('border-secondary'),
    overflow('overflow-hidden'),
    transitionProperty('transition-all')
  )
const button = classnames(
  backgroundColor(
    'hover:bg-highlighted-background',
    'active:bg-active-background'
  ),
  cursor('cursor-pointer'),
  cursor('cursor-pointer'),
  padding('py-2', 'px-4'),
  textAlign('text-center'),
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-center'),
  alignItems('items-center')
)
export default function () {
  const [open, setOpen] = useState(false)
  return (
    <div className={container}>
      <IconButton
        onClick={() => {
          setOpen(!open)
        }}
      >
        <LanguageIcon className={icon} />
      </IconButton>
      <div className={menuContainer(open)}>
        <div
          className={button}
          onClick={() => {
            LanguageStore.language = 'en'
            setOpen(false)
          }}
        >
          <Text>English</Text>
        </div>
        <Divider />
        <div
          className={button}
          onClick={() => {
            LanguageStore.language = 'ru'
            setOpen(false)
          }}
        >
          <Text>Русский</Text>
        </div>
      </div>
    </div>
  )
}
