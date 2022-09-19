import { useLocation } from 'wouter'
import classnames, { cursor, textColor } from 'classnames/tailwind'

const hashLink = classnames(
  textColor(
    'text-secondary',
    'hover:text-highlighted-background',
    'active:text-active-background'
  ),
  cursor('cursor-pointer')
)
export default function ({ slug }: { slug: string }) {
  const [location, setLocation] = useLocation()
  return (
    <span
      className={hashLink}
      onClick={() => {
        setLocation(`${location}#${slug}`)
      }}
    >
      #
    </span>
  )
}
