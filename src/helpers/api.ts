import Chapter from 'models/Chapter'
import Footnote from 'models/Footnote'
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

export function fetchFootnote(index: number) {
  return fetch(`${env.VITE_BACKEND_URL}/book/footnote/${index}`).then(
    (response) => response.json()
  ) as Promise<Footnote>
}

export function fetchFormats() {
  return fetch(`${env.VITE_BACKEND_URL}/book/formats`).then((response) =>
    response.json()
  ) as Promise<string[]>
}

export function fetchVersion() {
  return fetch(`${env.VITE_BACKEND_URL}/book/version`).then((response) =>
    response.json()
  ) as Promise<{ version: string }>
}
