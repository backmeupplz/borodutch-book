export default interface Chapter {
  readonly title: string
  readonly slug: string
  readonly subchapters: readonly Chapter[]
}
