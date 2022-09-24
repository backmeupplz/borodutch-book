import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { Suspense, useEffect, useState } from 'preact/compat'
import { toast } from 'react-toastify'
import { useSigner } from '@web3modal/react'
import { useSnapshot } from 'valtio'
import FreeSlugsStore from 'stores/FreeSlugsStore'
import IconButton from 'components/IconButton'
import WalletContext from 'context/WalletContext'
import icon from 'classnames/icon'
import useSlug from 'hooks/useSlug'

function ShareButtonSuspended() {
  const { freeSlugs } = useSnapshot(FreeSlugsStore)
  const slug = useSlug()
  if (!slug) return null
  const isFree = freeSlugs.includes(slug)
  const { signer, refetch } = useSigner()
  useEffect(() => {
    void refetch({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [signature, setSignature] = useState<string | undefined>('')
  useEffect(() => {
    setSignature('')
  }, [slug])
  return (
    <WalletContext.Consumer>
      {({ ownsToken, address }) =>
        (isFree || (ownsToken && signer)) && (
          <IconButton
            onClick={async () => {
              if (freeSlugs.includes(slug)) {
                void navigator.clipboard.writeText(window.location.href)
                toast('Ссылка скопирована!', {
                  type: 'success',
                })
              } else {
                if (signature) {
                  void navigator.clipboard.writeText(
                    `${window.location.href}?signature=${signature}`
                  )
                  toast('Ссылка скопирована!', {
                    type: 'success',
                  })
                } else {
                  try {
                    setSignature(await signer?.signMessage(slug))
                    toast(
                      'Подпись создана! Нажмите кнопку еще раз, чтобы скопировать ссылку!',
                      {
                        type: 'success',
                      }
                    )
                  } catch (error) {
                    toast('Ошибка подписи!', {
                      type: 'error',
                    })
                  }
                }
              }
            }}
          >
            <ArrowUpOnSquareIcon className={icon} />
          </IconButton>
        )
      }
    </WalletContext.Consumer>
  )
}

export default function () {
  return (
    <Suspense fallback={null}>
      <ShareButtonSuspended />
    </Suspense>
  )
}
