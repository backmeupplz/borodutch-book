import { proxy } from 'valtio'
import Language from 'models/Language'
import PersistableStore from 'helpers/PersistableStore'

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
  language = getLanguage() as Language
}

export default proxy(new LanguageStore()).makePersistent()
