import { Text } from 'components/Text'
import Link from 'components/Link'
import Wallet from 'components/Wallet'
import WalletNote from 'components/WalletNote'

export default function () {
  return (
    <>
      <Text>
        Часть книги доступна бесплатно, но для того, чтобы получить доступ к
        большинству глав и загрузке файлов,{' '}
        <Link url="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/86597206928702930307486193712987064466367043993614253349341663474748447785515">
          необходимо купить токен книги на OpenSea
        </Link>{' '}
        и подключить свой кошелек к этому сайту.
      </Text>
      <Wallet />
      <WalletNote />
    </>
  )
}
