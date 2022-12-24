import { Route, Router } from 'wouter'
import { ToastContainer } from 'react-toastify'
import Chapter from 'pages/Chapter'
import Footnote from 'components/Chapter/Footnote'
import Footnotes from 'pages/Footnotes'
import Head from 'components/Head'
import Intl from 'components/Intl'
import Main from 'pages/Main'
import Navbar from 'components/Navbar'
import Root from 'components/Root'
import WalletProvider from 'components/WalletProvider'
import useHashLocation from 'components/Router'

const App = () => {
  return (
    <Intl>
      <WalletProvider>
        <Router hook={useHashLocation}>
          <Head />
          <Navbar />
          <Root>
            <Route path="/" component={Main} />
            <Route path="/footnotes" component={Footnotes} />
            <Route path="/:chapter" component={Chapter} />
          </Root>
          <Footnote />
        </Router>
        <ToastContainer theme="dark" position="bottom-right" />
      </WalletProvider>
    </Intl>
  )
}

export default App
