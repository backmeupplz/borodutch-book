export default interface Content {
  readonly class?: string
  readonly tagName?: string
  readonly text?: string
  readonly children?: readonly Content[]
}
