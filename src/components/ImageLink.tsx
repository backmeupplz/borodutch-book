import Link from 'components/Link'

export default function ({ src, alt }: { src: string; alt: string }) {
  return (
    <Link url={src}>
      <img src={src} alt={alt} />
    </Link>
  )
}
