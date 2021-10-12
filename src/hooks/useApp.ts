import * as api from 'helpers/api'
import { useState } from 'react'

const useApp = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const submitEmail = async () => {
    try {
      setLoading(true)
      await api.submitEmail(email)
    } catch (err) {
      setError(true)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { submitEmail, email, loading, error, setEmail }
}

export default useApp
