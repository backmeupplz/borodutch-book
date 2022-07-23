import { subscribe } from 'valtio'
import SequreLS from 'secure-ls'
import env from 'helpers/env'

const ls = new SequreLS({
  encodingType: 'des',
  isCompression: false,
  encryptionSecret: env.VITE_ENCRYPT_KEY as string,
})
export default class {
  reviver = (_: string, value: unknown) => value
  replacer = (_: string, value: unknown) => value

  get persistanceName() {
    return this.constructor.name
  }

  persist(encrypt: boolean) {
    const json = JSON.stringify(this, this.replacer)
    encrypt
      ? ls.set(this.persistanceName, json)
      : localStorage.setItem(this.persistanceName, json)
  }

  makePersistent(encrypt = false) {
    // Start persisting
    subscribe(this, () => {
      this.persist(encrypt)
    })
    // Recover the store
    if (encrypt && this.checkIfJsonFormat(this.persistanceName)) {
      ls.set(this.persistanceName, localStorage.getItem(this.persistanceName))
    }
    const savedString = encrypt
      ? ls.get(this.persistanceName)
      : localStorage.getItem(this.persistanceName)
    if (savedString) {
      const savedState = JSON.parse(savedString, this.reviver)
      Object.assign(this, savedState)
    }
    // Persist just in case
    this.persist(encrypt)
    // Allow chaining
    return this
  }

  checkIfJsonFormat(name: string) {
    const savedString = localStorage.getItem(name)
    if (savedString === null) return false
    try {
      JSON.parse(savedString, this.reviver)
    } catch (error) {
      return false
    }
    return true
  }
}
