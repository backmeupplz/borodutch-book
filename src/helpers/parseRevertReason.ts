export default function (serializedError: string) {
  try {
    return JSON.parse(serializedError.split(', ')[3].replace('error=', ''))
      .message as string
  } catch {
    return undefined
  }
}
