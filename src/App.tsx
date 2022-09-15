import { Route, Router } from 'wouter'
import { useCallback, useEffect, useState } from 'preact/hooks'
import Chapter from 'pages/Chapter'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import Root from 'components/Root'

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
    <Router hook={useHashLocation as any}>
      {/* TODO: fix types ^^^ */}
      <Navbar />
      <Root>
        <Route path="/" component={Main} />
        <Route path="/:chapter" component={Chapter} />
      </Root>
    </Router>
  )
}

export default App
