import { useEffect, useState } from 'preact/hooks'
import classnames, {
  backgroundColor,
  display,
  height,
  transitionProperty,
} from 'classnames/tailwind'

const separator = classnames(
  display('flex'),
  height('h-px'),
  backgroundColor('bg-active-background'),
  transitionProperty('transition-colors')
)
export default function () {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const scrollable = scrollHeight - clientHeight
      setProgress(scrollable > 0 ? (scrollTop / scrollable) * 100 : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return <div className={separator} style={{ width: `${progress}%` }} />
}
