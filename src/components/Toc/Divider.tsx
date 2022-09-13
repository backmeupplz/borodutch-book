import classnames, {
  borderColor,
  borderWidth,
  height,
  width,
} from 'classnames/tailwind'

const divider = classnames(
  borderWidth('border-t'),
  borderColor('border-secondary'),
  width('w-full'),
  height('h-0')
)
export default function () {
  return <div className={divider} />
}
