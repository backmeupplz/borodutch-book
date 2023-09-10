import { Text as IntlText } from 'preact-i18n'
import { Text } from 'components/Text'
import Link from 'components/Link'
import Wallet from 'components/Wallet'
import WalletNote from 'components/WalletNote'

export default function () {
  return (
    <>
      <Text>
        <IntlText id="wallet.buyDescription.free" />
        <Link url="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/86597206928702930307486193712987064466367043993614253349341663474748447785515">
          <IntlText id="wallet.buyDescription.link" />
        </Link>
        <IntlText id="wallet.buyDescription.connectWallet" />
        <Link url="https://a.co/d/f0pulXR">
          <IntlText id="wallet.buyDescription.buyOnAmazon" />
        </Link>
        !
      </Text>
      <Wallet />
      <WalletNote />
    </>
  )
}
