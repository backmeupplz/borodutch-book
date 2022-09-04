import ImageLink from 'components/ImageLink'
import classnames, { display } from 'classnames/tailwind'

const container = classnames(display('flex'))
export default function () {
  return (
    <div className={container}>
      <ImageLink src="/images/banner.png" alt="banner" />
    </div>
  )
}
