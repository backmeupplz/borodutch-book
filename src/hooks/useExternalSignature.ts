import { useLocation } from 'wouter'

export default function () {
  const [location] = useLocation()
  return location.split('?signature=')[1]
}
