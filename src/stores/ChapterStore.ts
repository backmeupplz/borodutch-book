import { fetchChapter, fetchToc } from 'helpers/api'
import { proxy } from 'valtio'
import Chapter from 'models/Chapter'
import SignatureStore from 'stores/SignatureStore'
import flattenToc from 'helpers/flattenToc'
import message from 'helpers/message'

class ChapterStore {
  toc: Promise<Chapter[]>
  chapters: {
    [slug: string]: Promise<Chapter>
  } = {}

  constructor() {
    this.toc = fetchToc()
  }

  fetchChapter(slug: string) {
    if (!this.chapters[slug]) {
      this.chapters[slug] = fetchChapter(
        slug,
        message,
        SignatureStore.signature
      ).then(async (chapter) => {
        if (!chapter.beginning.length && chapter.level === 1) {
          const flatToc = flattenToc(await this.toc)
          const chapterIndex = flatToc.findIndex((item) => item.slug === slug)
          return {
            ...chapter,
            subchapters: chapter.beginning.length
              ? chapter.subchapters || []
              : [await fetchChapter(flatToc[chapterIndex + 1].slug)],
          }
        }
        return chapter
      })
    }
  }
}

export default proxy(new ChapterStore())
