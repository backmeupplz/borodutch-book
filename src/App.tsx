import Root from 'components/Root'
import useApp from 'hooks/useApp'

const App = () => {
  const { submitEmail, email, loading, error, setEmail } = useApp()

  return <Root></Root>
}

export default App
