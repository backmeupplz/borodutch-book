export default interface Content {
  readonly class?: string
  readonly text?: string
  readonly children?: readonly Content[]
}
