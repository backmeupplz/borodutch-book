import { fetchFootnote, fetchFootnotes } from 'helpers/api'
import { proxy } from 'valtio'
import Footnote from 'models/Footnote'

class FootnoteStore {
  currentFootnote: number | undefined
  footnotes: {
    [index: number]: Promise<Footnote>
  } = {}
  allFootnotes: Promise<Footnote[]> | undefined

  fetchFootnote(index: number) {
    if (!this.footnotes[index]) {
      this.footnotes[index] = fetchFootnote(index - 1)
    }
  }

  fetchFootnotes() {
    if (!this.allFootnotes) {
      this.allFootnotes = fetchFootnotes()
    }
  }
}

export default proxy(new FootnoteStore())
