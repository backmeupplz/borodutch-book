import { useScrollProgress } from '@bogachenkov/react-scrolling-progress'
import classnames, {
  backgroundColor,
  display,
  height,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const separator = classnames(
  display('flex'),
  height('h-px'),
  backgroundColor('bg-active-background'),
  transitionProperty('transition-colors')
)
export default function () {
  const { progressString } = useScrollProgress()
  return (
    <div
      className={separator}
      style={{
        width: progressString,
      }}
    />
  )
}
