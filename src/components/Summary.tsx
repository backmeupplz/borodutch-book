import ImageLink from 'components/ImageLink'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  space('space-y-2', 'md:space-y-0', 'md:space-x-2')
)
export default function () {
  return (
    <div className={container}>
      <ImageLink src="/images/summary-1.png" alt="summary" />
      <ImageLink src="/images/summary-2.png" alt="summary continued" />
    </div>
  )
}
