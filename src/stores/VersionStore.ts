import { fetchVersions } from 'helpers/api'
import { proxy } from 'valtio'
import Edition from 'models/Edition'

class VersionStore {
  versions: Promise<Record<Edition, string>>
  constructor() {
    this.versions = fetchVersions()
  }
}

export default proxy(new VersionStore())
