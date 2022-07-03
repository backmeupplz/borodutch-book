import axios from 'axios'

export default async function submitEmail(email: string) {
  const data = await axios.post('https://backend.book.borodutch.com/email', {
    email,
  })
  return data
}
