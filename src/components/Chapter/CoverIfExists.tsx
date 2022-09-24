import { useEffect, useState } from 'react'
import Image from 'components/Image'
import classnames, {
  borderRadius,
  display,
  margin,
  overflow,
} from 'classnames/tailwind'
import useSlug from 'hooks/useSlug'

const container = (visible: boolean) =>
  classnames(
    display(visible ? 'block' : 'hidden'),
    margin('mb-8'),
    borderRadius('rounded-lg'),
    overflow('overflow-hidden'),
    margin('mx-auto')
  )
export default () => {
  const slug = useSlug()
  const [isValid, setIsValid] = useState(false)
  const src = `/covers/${slug}.webp`
  useEffect(() => {
    if (!slug) {
      setIsValid(false)
      return
    }
    setIsValid(false)
    void fetch(src)
      .then(({ status }) => {
        setIsValid(status === 200)
      })
      .catch(() => {
        setIsValid(false)
      })
  }, [src, slug])
  return (
    <div className={container(isValid)}>
      <Image src={src} alt="Обложка" />
    </div>
  )
}
