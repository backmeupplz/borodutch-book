import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { Suspense, useEffect, useState } from 'preact/compat'
import { toast } from 'react-toastify'
import { useSnapshot } from 'valtio'
import { useText } from 'preact-i18n'
import FreeSlugsStore from 'stores/FreeSlugsStore'
import IconButton from 'components/IconButton'
import WalletContext from 'context/WalletContext'
import icon from 'classnames/icon'
import signMessage from 'helpers/signMessage'
import useSlug from 'hooks/useSlug'

function ShareButtonSuspended({
  ownsToken,
  address,
}: {
  ownsToken: boolean
  address?: string | null
}) {
  const { freeSlugs } = useSnapshot(FreeSlugsStore)
  const slug = useSlug()
  const [signature, setSignature] = useState('')
  const { success } = useText('share.success')
  const { signatureSuccess } = useText('share.signatureSuccess')
  const { error: signatureError } = useText('share.error')
  useEffect(() => {
    setSignature('')
  }, [slug, address])
  if (!slug) return null
  const isFree = freeSlugs.includes(slug)
  return isFree || (ownsToken && address) ? (
    <IconButton
      onClick={async () => {
        if (isFree || signature) {
          await navigator.clipboard.writeText(
            isFree
              ? window.location.href
              : `${window.location.href}?signature=${signature}`
          )
          toast(success, { type: 'success' })
          return
        }
        try {
          setSignature(await signMessage(slug, address as string))
          toast(signatureSuccess, { type: 'success' })
        } catch (error) {
          console.error(error)
          toast(signatureError, { type: 'error' })
        }
      }}
    >
      <ArrowUpOnSquareIcon className={icon} />
    </IconButton>
  ) : null
}

export default function () {
  return (
    <WalletContext.Consumer>
      {({ ownsToken, address }) => (
        <Suspense fallback={null}>
          <ShareButtonSuspended ownsToken={ownsToken} address={address} />
        </Suspense>
      )}
    </WalletContext.Consumer>
  )
}
