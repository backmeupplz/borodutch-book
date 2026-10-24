const { VITE_BACKEND_URL, VITE_ALCHEMY_KEY } = import.meta.env as Record<
  string,
  string | undefined
>
if (!VITE_BACKEND_URL)
  throw new Error('VITE_BACKEND_URL is not set, see .env.sample')

export default { VITE_BACKEND_URL, VITE_ALCHEMY_KEY }
