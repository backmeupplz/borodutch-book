import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useSnapshot } from 'valtio'
import IconButton from 'components/IconButton'
import Theme from 'models/Theme'
import ThemeStore from 'stores/ThemeStore'
import icon from 'classnames/icon'

export default function () {
  const { theme } = useSnapshot(ThemeStore)
  return (
    <IconButton onClick={() => ThemeStore.toggleTheme()}>
      {theme === Theme.dark ? (
        <MoonIcon className={icon} />
      ) : (
        <SunIcon className={icon} />
      )}
    </IconButton>
  )
}
