import { fetchFootnote, fetchFootnotes } from 'helpers/api'
import { proxy } from 'valtio'
import Edition from 'models/Edition'
import Footnote from 'models/Footnote'

class FootnoteStore {
  currentFootnote: number | undefined
  footnotes: {
    [index: number]: Promise<Footnote>
  } = {}
  allFootnotes: Promise<Footnote[]> | undefined

  fetchFootnote(index: number, edition: Edition) {
    if (!this.footnotes[index]) {
      this.footnotes[index] = fetchFootnote(index - 1, edition)
    }
  }

  fetchFootnotes(edition: Edition) {
    if (!this.allFootnotes) {
      this.allFootnotes = fetchFootnotes(edition)
    }
  }
}

export default proxy(new FootnoteStore())
