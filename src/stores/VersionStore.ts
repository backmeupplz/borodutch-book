import { fetchVersion } from 'helpers/api'
import { proxy } from 'valtio'

class VersionStore {
  version: Promise<{ version: string }>
  constructor() {
    this.version = fetchVersion()
  }
}

export default proxy(new VersionStore())
