import { proxy } from 'valtio'
import bookTitle from 'helpers/bookTitle'

export default proxy({
  title: bookTitle.long,
})
