import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import Theme from 'models/Theme'

class ThemeStore extends PersistableStore {
  theme = Theme.system

  initialize() {
    if (this.theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.theme = Theme.dark
      } else {
        this.theme = Theme.light
      }
    }
    this.checkTheme()
    return this
  }

  toggleTheme() {
    this.theme = this.theme === Theme.dark ? Theme.light : Theme.dark
    this.checkTheme()
  }

  private checkTheme() {
    if (this.theme === Theme.dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

export default proxy(new ThemeStore()).makePersistent().initialize()
