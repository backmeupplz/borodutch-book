import { IntlProvider } from 'preact-i18n'
import ChildrenProp from 'models/ChildrenProp'
import useIntlDefinition from 'hooks/useIntlDefinition'

export default function ({ children }: ChildrenProp) {
  const intlDefinition = useIntlDefinition()
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <IntlProvider definition={intlDefinition}>{children as any}</IntlProvider>
  )
}
