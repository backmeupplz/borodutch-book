import { Text, useText } from 'preact-i18n'
import { Title } from 'components/Text'
import { useEffect, useState } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import ChapterStore from 'stores/ChapterStore'
import ChapterText from 'components/Chapter/ChapterText'
import CoverIfExists from 'components/Chapter/CoverIfExists'
import Divider from 'components/Divider'
import Footer from 'components/Chapter/Footer'
import FreeSlugsStore from 'stores/FreeSlugsStore'
import LanguageStore from 'stores/LanguageStore'
import ScrollToTop from 'components/ScrollToTop'
import SignatureStore from 'stores/SignatureStore'
import SuspenseWithError from 'components/SuspenseWithError'
import WalletBlock from 'components/WalletBlock'
import classnames, {
  display,
  flexDirection,
  gap,
  margin,
  maxWidth,
  textAlign,
} from 'classnames/tailwind'
import flattenToc from 'helpers/flattenToc'
import getHashComponents from 'helpers/getHashComponents'
import useExternalSignature from 'hooks/useExternalSignature'
import useSlug from 'hooks/useSlug'

const dividerContainer = margin('my-4')
const subtitle = textAlign('text-center')
function ChapterSuspended({ slug }: { slug: string }) {
  const { chapters } = useSnapshot(ChapterStore)
  const { language } = useSnapshot(LanguageStore)
  const chapter = chapters[language][slug]
  const subchapter = chapter.subchapters?.[0]
  const [anchor, setAnchor] = useState(getHashComponents().anchor)
  useEffect(() => {
    const handler = () => setAnchor(getHashComponents().anchor)
    window.addEventListener('hashchange', handler)
    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('hashchange', handler)
      window.removeEventListener('popstate', handler)
    }
  }, [])
  function _scrollTo(id: string, yOffset = 0) {
    const el = document.getElementById(id)
    const y =
      (el?.getBoundingClientRect().top || 0) - 10 + window.pageYOffset - yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  useEffect(() => {
    const offset = document
      .getElementById('navbar')
      ?.getBoundingClientRect().height
    _scrollTo(anchor, offset)
  }, [anchor, chapter])
  return (
    <>
      <Title large>{chapter.title}</Title>
      {subchapter && (
        <span className={subtitle}>
          <Title>{subchapter.title}</Title>
        </span>
      )}
      <div className={dividerContainer}>
        <Divider />
      </div>
      <ChapterText chapter={subchapter || chapter} />
      <Footer chapter={subchapter || chapter} />
      {!anchor && <ScrollToTop />}
    </>
  )
}

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-4')
)
function ChapterWrapper({ slug }: { slug: string }) {
  const { freeSlugs } = useSnapshot(FreeSlugsStore)
  const { language } = useSnapshot(LanguageStore)
  const { signatures } = useSnapshot(SignatureStore)
  const signature = signatures[language]
  const externalSignature = useExternalSignature()

  if (!signature && !externalSignature && !freeSlugs.includes(slug)) {
    const { toc } = useSnapshot(ChapterStore)
    const title = flattenToc(toc[language]).find(
      (chapter) => chapter.slug === slug
    )?.title
    return (
      <>
        <Title large>{title}</Title>
        <span className={subtitle}>
          <Title>
            <Text id="chapter.needUnlocking" />
          </Title>
        </span>
        <div className={dividerContainer}>
          <Divider />
        </div>
        <div className={walletContainer}>
          <WalletBlock />
        </div>
      </>
    )
  }
  ChapterStore.fetchChapter(
    slug,
    language,
    externalSignature ? slug : undefined,
    externalSignature || signature
  )
  return <ChapterSuspended slug={slug} />
}

const container = classnames(maxWidth('max-w-2xl'), margin('mx-auto'))
export default function () {
  const slug = useSlug()

  const { errorLoading } = useText('chapter.errorLoading')

  if (slug === 'footnotes') {
    return null
  }

  return slug ? (
    <div className={container}>
      <CoverIfExists />
      <SuspenseWithError
        fallback={
          <Title large>
            <Text id="chapter.loading" />
          </Title>
        }
        errorText={errorLoading}
      >
        <ChapterWrapper slug={slug} />
      </SuspenseWithError>
    </div>
  ) : null
}
