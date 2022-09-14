export default interface Chapter {
  readonly level: number
  readonly title: string
  readonly slug: string
  readonly subchapters: readonly Chapter[]
}
