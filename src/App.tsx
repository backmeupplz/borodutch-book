import { FC } from 'react'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  cursor,
  fontSize,
  fontWeight,
  hardwareAcceleration,
  margin,
  outlineStyle,
  padding,
  placeholderColor,
  scale,
  textColor,
  textDecoration,
  transitionProperty,
  transitionTimingFunction,
  translate,
} from 'classnames/tailwind'
import Root from 'components/Root'
import useApp from 'hooks/useApp'

const text = classnames(
  textColor('text-primary'),
  fontSize('text-2xl', 'md:text-4xl'),
  fontWeight('font-bold'),
  margin('mb-3', 'md:mb-4')
)
const Text: FC = ({ children }) => <p className={text}>{children}</p>

const link = textDecoration('underline')
const Link: FC<{ url: string }> = ({ children, url }) => (
  <a href={url} className={link} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
)

const accent = textColor('text-yellow-600')
const Accent: FC = ({ children }) => <span className={accent}>{children}</span>

const textField = classnames(
  padding('px-6', 'py-4'),
  margin('my-4', 'mr-4'),
  backgroundColor('bg-transparent'),
  borderWidth('border'),
  borderColor('border-gray-400', 'focus:border-primary'),
  transitionProperty('transition-colors'),
  borderRadius('rounded'),
  textColor('text-primary'),
  outlineStyle('focus:outline-none'),
  placeholderColor('placeholder-gray-400')
)

const button = (disabled: boolean, loading: boolean) =>
  classnames(
    padding('px-6', 'py-4'),
    margin('mb-6'),
    backgroundColor(disabled || loading ? 'bg-gray-400' : 'bg-primary'),
    textColor('text-black-background'),
    borderRadius('rounded'),
    cursor(
      loading
        ? 'cursor-wait'
        : disabled
        ? 'cursor-not-allowed'
        : 'cursor-pointer'
    ),
    outlineStyle('focus:outline-none'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    scale(disabled ? undefined : 'hover:scale-110'),
    translate(disabled ? undefined : 'hover:translate-x-2'),
    hardwareAcceleration('transform-gpu')
  )
const Button: FC<{
  onClick: () => void
  loading: boolean
  disabled: boolean
}> = ({ onClick, children, loading, disabled }) => (
  <button
    className={button(disabled, loading)}
    onClick={onClick}
    disabled={loading || disabled}
  >
    {children}
    {loading && ' 🤔'}
  </button>
)

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
        Первая версия готова на 98.5%<Accent>!</Accent> Делаем обложку,
        подготавливаем каналы дистрибьюции<Accent>.</Accent>
      </Text>
      <Text>
        Хотите получить имейл, когда книгу можно будет купить<Accent>?</Accent>{' '}
        Оставьте свою почту ниже<Accent>!</Accent>
      </Text>
      <input
        type="email"
        placeholder="Ваш имейл"
        className={textField}
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
    </Root>
  )
}

export default App
