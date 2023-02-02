import Chapter from 'models/Chapter'
import Edition from 'models/Edition'
import Footnote from 'models/Footnote'
import env from 'helpers/env'

export function fetchToc(edition: Edition) {
  return fetch(`${env.VITE_BACKEND_URL}/book/toc?edition=${edition}`).then(
    (response) => response.json()
  ) as Promise<Chapter[]>
}

export function fetchLastReadySlugs() {
  return fetch(`${env.VITE_BACKEND_URL}/book/lastReadySlugs`).then((response) =>
    response.json()
  ) as Promise<Record<Edition, string>>
}

export function fetchAllEditionsSlugs(slug: string) {
  return fetch(
    `${env.VITE_BACKEND_URL}/book/allEditionsSlugs?slug=${slug}`
  ).then((response) => response.json()) as Promise<Record<Edition, string>>
}

export function fetchChapter(
  slug: string,
  edition: Edition,
  message?: string,
  signature?: string
) {
  return fetch(
    `${env.VITE_BACKEND_URL}/book/chapter/${slug}?edition=${edition}${
      message && signature ? `&message=${message}&signature=${signature}` : ''
    }`
  ).then((response) => response.json()) as Promise<Chapter>
}

export function fetchFootnote(index: number, edition: Edition) {
  return fetch(
    `${env.VITE_BACKEND_URL}/book/footnote/${index}?edition=${edition}`
  ).then((response) => response.json()) as Promise<Footnote>
}

export function fetchFootnotes(edition: Edition) {
  return fetch(
    `${env.VITE_BACKEND_URL}/book/footnotes?edition=${edition}`
  ).then((response) => response.json()) as Promise<Footnote[]>
}

export function fetchFormats() {
  return fetch(`${env.VITE_BACKEND_URL}/book/formats`).then((response) =>
    response.json()
  ) as Promise<string[]>
}

export function fetchVersions() {
  return fetch(`${env.VITE_BACKEND_URL}/book/versions`).then((response) =>
    response.json()
  ) as Promise<Record<Edition, string>>
}

export function fetchFreeSlugs() {
  return fetch(`${env.VITE_BACKEND_URL}/book/free-slugs`).then(
    async (response) =>
      Object.values(
        (await response.json()) as Promise<Record<Edition, string[]>>
      ).reduce((p, c) => p.concat(c), [])
  ) as Promise<string[]>
}
