import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'

class SignatureStore extends PersistableStore {
  signature: string | undefined
}

export default proxy(new SignatureStore()).makePersistent()
