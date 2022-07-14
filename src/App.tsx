import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import Accent from 'components/Accent'
import Button from 'components/Button'
import Link from 'components/Link'
import Root from 'components/Root'
import Text from 'components/Text'
import TextField from 'components/TextField'
import useApp from 'hooks/useApp'

const App = () => {
  const {
    submitEmailToApi,
    email,
    loading,
    error,
    setEmail,
    isEmailValid,
    success,
  } = useApp()

  return (
    <Root>
      <Text>
        Привет всем<Accent>!</Accent> Это{' '}
        <Link url="https://borodutch.com">Никита</Link>
        <Accent>.</Accent>
      </Text>
      <Text>
        Я пишу книгу о том, как резко повысить качество своей жизни на основе
        научных исследований<Accent>!</Accent>
      </Text>
      <Text>
        Книга состоит из четырех частей: рациональное мышление, внешнее счастье,
        внутреннее счастье, достижение успеха<Accent>.</Accent>
      </Text>
      <Text>
        Первая версия готова на 99.5%<Accent>!</Accent> Вносим последние правки,
        пишем благодарности, подготавливаем каналы дистрибьюции
        <Accent>.</Accent>
      </Text>
      <Text>
        Хотите получить имейл, когда книгу можно будет купить<Accent>?</Accent>{' '}
        Оставьте свою почту ниже<Accent>!</Accent>
      </Text>
      <TextField
        type="email"
        placeholder="Ваш имейл"
        value={email}
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setEmail(e.target.value)
          }
        }}
        disabled={loading}
      />
      <Button
        onClick={submitEmailToApi}
        loading={loading}
        disabled={!isEmailValid}
      >
        Оставить почту
      </Button>
      {error && (
        <Text>
          Ох, что-то пошло не так<Accent>!</Accent>{' '}
          <Link url="https://t.me/borodutch">Напишите мне</Link> о том, что у
          вас все сломалось, пожалуйста<Accent>!</Accent>
        </Text>
      )}
      {success && (
        <Text>
          Спасибо за то, что оставили свою почту<Accent>!</Accent> Вы получите
          имейл, как только книга поступит в продажу<Accent>!</Accent>
        </Text>
      )}
      <ToastContainer position="bottom-right" theme="dark" />
    </Root>
  )
}

export default App
