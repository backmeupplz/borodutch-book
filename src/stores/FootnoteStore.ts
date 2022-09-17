import { proxy } from 'valtio'

class FootnoteStore {
  currentFootnote: number | undefined
}

export default proxy(new FootnoteStore())
