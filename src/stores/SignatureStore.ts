import { proxy } from 'valtio'
import Edition from 'models/Edition'
import PersistableStore from 'helpers/PersistableStore'

class SignatureStore extends PersistableStore {
  signatures = {} as Record<Edition, string | undefined>
}

export default proxy(new SignatureStore()).makePersistent()
