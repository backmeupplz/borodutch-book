import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import axios from 'axios'
import parseRevertReason from 'helpers/parseRevertReason'

export const ProofGenerationErrors = {}

export const ErrorList = {
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Похоже,вы подключены к ${userNetwork} сети, переключитесь на ${contractNetwork} и попробуйте снова`,
  unknown: 'Неизвестная ошибка! Напишите мне в Телеграме, попрввим!',
  clear: '',
}

export default function (error: unknown) {
  console.error(error)

  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error || axios.isAxiosError(error))
    displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    displayedError = parseRevertReason(message) ?? message
  }
  if (!displayedError) displayedError = ErrorList.unknown

  toast.error(displayedError)
}
