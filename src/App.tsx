import { Route, Router } from 'wouter'
import { useCallback, useEffect, useState } from 'preact/hooks'
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
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = useCallback((to: string) => (window.location.hash = to), [])
  return [loc, navigate]
}

const App = () => {
  return (
    <>
      <Navbar />
      <Root>
        {/* TODO: fix types */}
        <Router hook={useHashLocation as any}>
          <Route path="/" component={Main} />
        </Router>
      </Root>
    </>
  )
}

export default App
