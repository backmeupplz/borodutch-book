import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import Root from 'components/Root'
import useApp from 'hooks/useApp'

const text = classnames(
  'text-primary',
  'text-2xl',
  'md:text-4xl',
  'font-bold',
  'mb-3',
  'md:mb-4'
)
const Text: FC = ({ children }) => <p className={text}>{children}</p>

const link = classnames('underline')
const Link: FC<{ url: string }> = ({ children, url }) => (
  <a href={url} className={link} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
)

const accent = classnames('text-yellow-600')
const Accent: FC = ({ children }) => <span className={accent}>{children}</span>

const textField = classnames(
  'px-6',
  'py-4',
  'my-4',
  'bg-transparent',
  'border',
  'border-gray-400',
  'transition-colors',
  'rounded',
  'text-primary',
  'focus:border-primary',
  'focus:outline-none',
  'placeholder-gray-400',
  'mr-4'
)

const button = (disabled: boolean, loading: boolean) =>
  classnames(
    'px-6',
    'py-4',
    'mb-6',
    disabled || loading ? 'bg-gray-400' : 'bg-primary',
    'text-black-background',
    'rounded',
    loading
      ? 'cursor-wait'
      : disabled
      ? 'cursor-not-allowed'
      : 'cursor-pointer',
    'focus:outline-none',
    'transition-all',
    'ease-in-out',
    disabled ? undefined : 'hover:scale-110',
    disabled ? undefined : 'hover:translate-x-2',
    'transform-gpu'
  )
const Button: FC<{ onClick: () => void; loading: boolean; disabled: boolean }> =
  ({ onClick, children, loading, disabled }) => (
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
    submitEmail,
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
        Первая версия готова на 71%<Accent>!</Accent>
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
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        disabled={loading}
      />
      <Button onClick={submitEmail} loading={loading} disabled={!isEmailValid}>
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
