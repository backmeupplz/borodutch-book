import Image from 'components/Image'
import classnames, { display } from 'classnames/tailwind'

const container = classnames(display('flex'))
export default function () {
  return (
    <div className={container}>
      <Image src="/images/banner.png" alt="banner" />
    </div>
  )
}
