import { fetchLastReadySlugs } from 'helpers/api'
import { proxy } from 'valtio'
import Edition from 'models/Edition'

class CompatibilityStore {
  lastReadySlugs: Promise<Record<Edition, string>>
  constructor() {
    this.lastReadySlugs = fetchLastReadySlugs()
  }
}

export default proxy(new CompatibilityStore())
