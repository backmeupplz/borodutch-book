import { useLocation } from 'wouter'
import classnames, { cursor, textColor } from 'classnames/tailwind'
import useExternalSignature from 'hooks/useExternalSignature'

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
  const externalSignature = useExternalSignature()
  return (
    <span
      className={hashLink}
      onClick={() => {
        setLocation(
          `${location.split('?')[0]}#${slug}${
            externalSignature ? `?signature=${externalSignature}` : ''
          }`
        )
      }}
    >
      #
    </span>
  )
}
