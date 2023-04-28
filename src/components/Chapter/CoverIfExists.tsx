import { fetchAllEditionsSlugs } from 'helpers/api'
import { useEffect, useState } from 'react'
import { useText } from 'preact-i18n'
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
  const pageSlug = useSlug()
  const [realSlug, setRealSlug] = useState('')
  const [src, setSrc] = useState('')

  // If slug changes, update src
  useEffect(() => {
    // If there is no slug, reset src and return
    if (!realSlug) return setSrc('')
    // Reset src
    setSrc('')
    // Remember slug when fetched
    const realSlugWhenFetched = realSlug
    async function fetchSrc(slug: string) {
      const { status } = await fetch(`/covers/${slug}.webp`)
      if (realSlugWhenFetched !== slug) return
      if (status === 200) {
        setSrc(`/covers/${slug}.webp`)
      } else {
        setSrc('')
      }
    }
    void fetchSrc(realSlug)
  }, [realSlug])

  // When page is changed, update the slug
  useEffect(() => {
    setRealSlug('')
    const pageSlugWhenFetched = pageSlug
    async function fetchRealSlug(pageSlug: string) {
      const { ru } = await fetchAllEditionsSlugs(pageSlug)
      if (pageSlugWhenFetched !== pageSlug) return
      setRealSlug(ru)
    }
    void fetchRealSlug(pageSlug)
  }, [pageSlug])
  const { chapterCoverAlt } = useText('chapterCoverAlt')
  return (
    <div className={container(!!src)}>
      <Image src={src} alt={chapterCoverAlt} />
    </div>
  )
}
