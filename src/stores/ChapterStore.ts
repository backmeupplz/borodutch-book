import { fetchChapter, fetchToc } from 'helpers/api'
import { proxy } from 'valtio'
import Chapter from 'models/Chapter'

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
      this.chapters[slug] = fetchChapter(slug)
    }
  }
}

export default proxy(new ChapterStore())
