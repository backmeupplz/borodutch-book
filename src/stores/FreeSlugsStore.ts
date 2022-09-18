import { fetchFreeSlugs } from 'helpers/api'
import { proxy } from 'valtio'

class FreeSlugsStore {
  freeSlugs: Promise<string[]>
  constructor() {
    this.freeSlugs = fetchFreeSlugs()
  }
}

export default proxy(new FreeSlugsStore())
