import { fetchFormats } from 'helpers/api'
import { proxy } from 'valtio'

class FormatsStore {
  formats: Promise<string[]>
  constructor() {
    this.formats = fetchFormats()
  }
}

export default proxy(new FormatsStore())
