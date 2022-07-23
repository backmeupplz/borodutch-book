import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import Accent from 'components/Accent'
import Button from 'components/Button'
import Download from 'components/Download'
import Text from 'components/Text'
import WalletStore from 'stores/WalletStore'

const wrap = wordBreak('break-all')
export default function () {
  const { account, walletLoading } = useSnapshot(WalletStore)
  return account ? (
    <>
      <Text>
        Подключенный кошелек<Accent>:</Accent>
      </Text>
      <div className={wrap}>
        <Text>{account}</Text>
      </div>
      <Download />
    </>
  ) : (
    <Button loading={walletLoading} onClick={() => WalletStore.connect()}>
      Подключить кошелек!
    </Button>
  )
}
