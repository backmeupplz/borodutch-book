import { subscribe } from 'valtio'

// Saves the store's fields to localStorage under its class name on every change
// (same keys and format as the @big-whale-labs/stores version it replaces)
export default class PersistableStore {
  makePersistent() {
    const name = this.constructor.name
    const saved = localStorage.getItem(name)
    if (saved) Object.assign(this, JSON.parse(saved))
    const persist = () => localStorage.setItem(name, JSON.stringify(this))
    subscribe(this, persist)
    persist()
    return this
  }
}
