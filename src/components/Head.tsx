import { Helmet } from 'react-helmet'
import { useSnapshot } from 'valtio'
import MetadataStore from 'stores/MetadataStore'

export default function () {
  // TODO: localize title
  const { title } = useSnapshot(MetadataStore)
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </Helmet>
  )
}
