import classnames, {
  backgroundColor,
  textAlign,
  textColor,
} from 'classnames/tailwind'

const image = classnames(
  textAlign('text-center'),
  textColor('text-primary'),
  backgroundColor('bg-highlighted-background')
)
export default function ({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width?: string
  height?: string
}) {
  return (
    <img src={src} alt={alt} width={width} height={height} className={image} />
  )
}
