import Content from 'models/Content'

export default interface Chapter {
  readonly level: number
  readonly title: string
  readonly slug: string
  readonly beginning: readonly Content[]
  readonly subchapters: readonly Chapter[]
}
