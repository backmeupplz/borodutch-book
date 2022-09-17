import { fetchFootnote } from 'helpers/api'
import { proxy } from 'valtio'
import Footnote from 'models/Footnote'

class FootnoteStore {
  currentFootnote: number | undefined

  footnotes: {
    [index: number]: Promise<Footnote>
  } = {}

  fetchFootnote(index: number) {
    if (!this.footnotes[index]) {
      this.footnotes[index] = fetchFootnote(index)
    }
  }
}

export default proxy(new FootnoteStore())
