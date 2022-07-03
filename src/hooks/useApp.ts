import { useEffect, useState } from 'react'
import submitEmail from 'helpers/submitEmail'

const useApp = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)

  useEffect(() => {
    const validateEmail = (email: string) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    setIsEmailValid(validateEmail(email))
  }, [email])

  const submitEmailToApi = async () => {
    setError(false)
    setSuccess(false)
    try {
      setLoading(true)
      await submitEmail(email)
      setEmail('')
      setSuccess(true)
    } catch (err) {
      setError(true)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    submitEmailToApi,
    email,
    loading,
    error,
    setEmail,
    isEmailValid,
    success,
  }
}

export default useApp
