import classnames, {
  backgroundColor,
  display,
  height,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const separator = classnames(
  display('flex'),
  width('w-full'),
  height('h-px'),
  backgroundColor('bg-secondary'),
  transitionProperty('transition-colors')
)
export default function () {
  return <div className={separator} />
}
