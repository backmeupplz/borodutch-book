import { useSnapshot } from 'valtio'
import LanguageStore from 'stores/LanguageStore'

import en from 'i18n/en.json'
import ru from 'i18n/ru.json'

export default function () {
  const { language } = useSnapshot(LanguageStore)
  return language === 'en' ? en : ru
}
