import { fetchFreeSlugs } from 'helpers/api'
import { proxy } from 'valtio'
import Edition from 'models/Edition'

class FreeSlugsStore {
  freeSlugs: Promise<Record<Edition, string[]>>
  constructor() {
    this.freeSlugs = fetchFreeSlugs()
  }
}

export default proxy(new FreeSlugsStore())
