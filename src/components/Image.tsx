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
  return <img src={src} alt={alt} width={width} height={height} />
}
