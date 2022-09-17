import { Route, Router } from 'wouter'
import { useCallback, useEffect, useState } from 'preact/hooks'
import Chapter from 'pages/Chapter'
import Footnote from 'components/Chapter/Footnote'
import Footnotes from 'pages/Footnotes'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import Root from 'components/Root'
import Web3Modal from 'components/Web3Modal'

// TODO: extract to a separate file
// Wouter hash router
const currentLoc = () => window.location.hash.replace('#', '') || '/'
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
    </Web3Modal>
  )
}

export default App
