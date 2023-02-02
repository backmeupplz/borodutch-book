import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import Edition from 'models/Edition'

class SignatureStore extends PersistableStore {
  signatures = {} as Record<Edition, string | undefined>
}

export default proxy(new SignatureStore()).makePersistent()
