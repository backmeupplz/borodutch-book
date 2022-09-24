import { useLocation } from 'wouter'

export default function () {
  const [location] = useLocation()
  return location.replace('%23', '#').substring(1).split('?')[0]
}
