import classnames, {
  backgroundColor,
  display,
  height,
  width,
} from 'classnames/tailwind'

const separator = classnames(
  display('flex'),
  width('w-full'),
  height('h-px'),
  backgroundColor('bg-secondary')
)
export default function () {
  return <div className={separator} />
}
