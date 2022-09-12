import { fetchToc } from 'helpers/api'
import { proxy } from 'valtio'
import Chapter from 'models/Chapter'

class ChapterStore {
  toc: Promise<Chapter[]>
  constructor() {
    this.toc = fetchToc()
  }
}

export default proxy(new ChapterStore())
