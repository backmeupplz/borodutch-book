import { Helmet } from 'react-helmet'
import { Suspense } from 'preact/compat'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import { useText } from 'preact-i18n'
import ChapterStore from 'stores/ChapterStore'
import flattenToc from 'helpers/flattenToc'
import useSlug from 'hooks/useSlug'

function Head({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </Helmet>
  )
}

function HeadSuspended() {
  const slug = useSlug()
  const { separator } = useText('title.separator')
  const { full } = useText('title.full')

  const { toc } = useSnapshot(ChapterStore)
  const title = flattenToc(toc).find((chapter) => chapter.slug === slug)?.title

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
