import { LanguageIcon } from '@heroicons/react/24/outline'
import IconButton from 'components/IconButton'
import icon from 'classnames/icon'

export default function () {
  return (
    <IconButton onClick={() => {}}>
      <LanguageIcon className={icon} />
    </IconButton>
  )
}
