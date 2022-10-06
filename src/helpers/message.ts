import LanguageStore from 'stores/LanguageStore'

export default () =>
  LanguageStore.language === 'en'
    ? 'Proof of ownership for "We Don\'t Live a Thousand Years"'
    : 'Подтверждение владения книгой "Не Тысячу Лет Живем"'
