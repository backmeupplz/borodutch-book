import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'

function getLanguage() {
  const language: string =
    navigator.language ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).userLanguage ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).browserLanguage ||
    'en'
  return language.toLowerCase().includes('ru') ? 'ru' : 'en'
}

class LanguageStore extends PersistableStore {
  language = getLanguage()
}

export default proxy(new LanguageStore()).makePersistent()
