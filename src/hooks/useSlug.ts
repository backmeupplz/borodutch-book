import { useLocation } from 'wouter'

export default function () {
  const [location] = useLocation()
  return location.substring(1).split('?')[0]
}
