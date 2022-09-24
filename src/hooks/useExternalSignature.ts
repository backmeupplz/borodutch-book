import { useLocation } from 'wouter'

export default function () {
  useLocation()
  return window.location.hash.split('?signature=')[1]
}
