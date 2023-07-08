import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { Suspense, useEffect, useState } from 'preact/compat'
import { toast } from 'react-toastify'
import { useAccount, useSignMessage } from 'wagmi'
import { useSnapshot } from 'valtio'
import { useText } from 'preact-i18n'
import FreeSlugsStore from 'stores/FreeSlugsStore'
import IconButton from 'components/IconButton'
import WalletContext from 'context/WalletContext'
import icon from 'classnames/icon'
import useSlug from 'hooks/useSlug'

function ShareButtonSuspended({ ownsToken }: { ownsToken: boolean }) {
  const { freeSlugs } = useSnapshot(FreeSlugsStore)
  const slug = useSlug()
  if (!slug) return null
  const isFree = freeSlugs.includes(slug)
  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message: slug,
  })
  const { address } = useAccount()
  const [signature, setSignature] = useState<string | undefined>('')
  const { success } = useText('share.success')
  const { signatureSuccess } = useText('share.signatureSuccess')
  const { error: signatureError } = useText('share.error')
  useEffect(() => {
    setSignature('')
  }, [slug])
  useEffect(() => {
    if (isSuccess) {
      setSignature(data)
      toast(signatureSuccess, {
        type: 'success',
      })
    } else if (isError) {
      toast(signatureError, {
        type: 'error',
      })
    }
  }, [data, isSuccess, isError, slug, signatureError, signatureSuccess])
  return isFree || (ownsToken && address) ? (
    <IconButton
      onClick={() => {
        if (isFree) {
          void navigator.clipboard.writeText(window.location.href)
          toast(success, {
            type: 'success',
          })
        } else {
          if (signature) {
            void navigator.clipboard.writeText(
              `${window.location.href}?signature=${signature}`
            )
            toast(success, {
              type: 'success',
            })
          } else {
            signMessage()
          }
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
      {({ ownsToken }) => (
        <Suspense fallback={null}>
          <ShareButtonSuspended ownsToken={ownsToken} />
        </Suspense>
      )}
    </WalletContext.Consumer>
  )
}
