import { useCallback, useEffect, useState } from 'preact/hooks'
import getHashComponents from 'helpers/getHashComponents'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default useHashLocation as any
