import { Suspense, useEffect } from 'preact/compat'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import { useText } from 'preact-i18n'
import ChapterStore from 'stores/ChapterStore'
import LanguageStore from 'stores/LanguageStore'
import flattenToc from 'helpers/flattenToc'
import useSlug from 'hooks/useSlug'

function Head({ title }: { title: string }) {
  useEffect(() => {
    document.title = title
    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ])
      document.querySelector(selector)?.setAttribute('content', title)
  }, [title])
  return null
}

function HeadSuspended() {
  const slug = useSlug()
  const { separator } = useText('title.separator')
  const { full } = useText('title.full')

  const { toc } = useSnapshot(ChapterStore)
  const { language } = useSnapshot(LanguageStore)
  const title = flattenToc(toc[language]).find(
    (chapter) => chapter.slug === slug
  )?.title
  if (!title) return ususalTitle()

  return <Head title={`${title}${separator}${full}`} />
}

function ususalTitle() {
  const { full } = useText('title.full')
  return <Head title={full} />
}

function footnotesTitle() {
  const { title: footnotesTitle } = useText('endnotes.title')
  const { separator } = useText('title.separator')
  const { full } = useText('title.full')
  return <Head title={`${footnotesTitle}${separator}${full}`} />
}

export default function () {
  const [location] = useLocation()
  const isHome = location === '/'
  const isFootnotes = location === '/footnotes'
  return isHome ? (
    ususalTitle()
  ) : isFootnotes ? (
    footnotesTitle()
  ) : (
    <Suspense fallback={ususalTitle()}>
      <HeadSuspended />
    </Suspense>
  )
}
