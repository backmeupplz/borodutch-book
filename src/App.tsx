import { Route, Router } from 'wouter'
import { ToastContainer } from 'react-toastify'
import { useCallback, useEffect, useState } from 'preact/hooks'
import Chapter from 'pages/Chapter'
import Footnote from 'components/Chapter/Footnote'
import Footnotes from 'pages/Footnotes'
import Head from 'components/Head'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import Root from 'components/Root'
import Web3Modal from 'components/Web3Modal'
import getHashComponents from 'helpers/getHashComponents'

// TODO: extract to a separate file
// Wouter hash router
const currentLoc = () =>
  getHashComponents().slug ? `/${getHashComponents().slug}` : '/'

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLoc())

  useEffect(() => {
    const handler = () => setLoc(currentLoc())

    window.addEventListener('hashchange', handler)
    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('hashchange', handler)
      window.removeEventListener('popstate', handler)
    }
  }, [])

  const navigate = useCallback((to: string) => (window.location.hash = to), [])
  return [loc, navigate]
}

const App = () => {
  return (
    <Web3Modal>
      <Head />
      <Router hook={useHashLocation as any}>
        {/* TODO: fix types ^^^ */}
        <Navbar />
        <Root>
          <Route path="/" component={Main} />
          <Route path="/footnotes" component={Footnotes} />
          <Route path="/:chapter" component={Chapter} />
        </Root>
        <Footnote />
      </Router>
      <ToastContainer theme="dark" position="bottom-right" />
    </Web3Modal>
  )
}

export default App
