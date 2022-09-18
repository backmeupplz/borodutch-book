export default interface Content {
  readonly class?: string
  readonly tagName?: string
  readonly text?: string
  readonly slug?: string
  readonly children?: readonly Content[]
}
