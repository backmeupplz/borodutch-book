import { fetchChapter, fetchToc } from 'helpers/api'
import { proxy } from 'valtio'
import Chapter from 'models/Chapter'
import Edition from 'models/Edition'
import defaultMessage from 'helpers/message'
import flattenToc from 'helpers/flattenToc'

class ChapterStore {
  toc: Record<Edition, Promise<Chapter[]> | undefined> = {
    ru: undefined,
    en: undefined,
    'ru-f': undefined,
  }
  chapters = {} as Record<
    Edition,
    {
      [slug: string]: Promise<Chapter>
    }
  >

  fetchToc(edition: Edition) {
    if (!this.toc[edition]) {
      this.toc[edition] = this.toc[edition] = fetchToc(edition)
    }
  }

  fetchChapter(
    slug: string,
    edition: Edition,
    message = defaultMessage(),
    signature?: string
  ) {
    if (!this.chapters[edition]) {
      this.chapters[edition] = {}
    }
    if (!this.chapters[edition][slug]) {
      this.chapters[edition][slug] = fetchChapter(
        slug,
        edition,
        message,
        signature
      ).then(async (chapter) => {
        if (!chapter.beginning.length && chapter.level === 1) {
          let flatToc = flattenToc(await this.toc[edition])
          if (!flatToc.length) {
            this.fetchToc(edition)
            flatToc = flattenToc(await this.toc[edition])
          }
          const chapterIndex = flatToc.findIndex((item) => item.slug === slug)
          return {
            ...chapter,
            subchapters: chapter.beginning.length
              ? chapter.subchapters || []
              : [
                  await fetchChapter(
                    flatToc[chapterIndex + 1].slug,
                    edition,
                    message,
                    signature
                  ),
                ],
          }
        }
        return chapter
      })
    }
  }
}

export default proxy(new ChapterStore())
