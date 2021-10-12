import axios from 'axios'

export async function submitEmail(email: string) {
  const data = await axios.post('https://backend.book.borodutch.com/email', {
    email,
  })
  return data
}
