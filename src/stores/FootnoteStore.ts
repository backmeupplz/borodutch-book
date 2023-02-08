import { fetchFootnote, fetchFootnotes } from 'helpers/api'
import { proxy } from 'valtio'
import Edition from 'models/Edition'
import Footnote from 'models/Footnote'

class FootnoteStore {
  currentFootnote: number | undefined
  footnotes: Record<
    Edition,
    {
      [index: number]: Promise<Footnote>
    }
  > = { ru: {}, en: {}, 'ru-f': {} }
  allFootnotes: Record<Edition, Promise<Footnote[]> | undefined> = {
    ru: undefined,
    en: undefined,
    'ru-f': undefined,
  }

  fetchFootnote(index: number, edition: Edition) {
    if (!this.footnotes[edition][index]) {
      this.footnotes[edition][index] = fetchFootnote(index - 1, edition)
    }
  }

  fetchFootnotes(edition: Edition) {
    if (!this.allFootnotes[edition]) {
      this.allFootnotes[edition] = fetchFootnotes(edition)
    }
  }
}

export default proxy(new FootnoteStore())
