import Chapter from 'models/Chapter'
import env from 'helpers/env'

export function fetchToc() {
  return fetch(`${env.VITE_BACKEND_URL}/book/toc`).then((response) =>
    response.json()
  ) as Promise<Chapter[]>
}

export function fetchChapter(slug: string) {
  return fetch(`${env.VITE_BACKEND_URL}/book/chapter/${slug}`).then(
    (response) => response.json()
  ) as Promise<Chapter>
}
