class Storage {
  constructor(provider) {
    this._provider = provider
  }
  get() {
    const obj = {}
    return arguments.length > 1
      ? this._arrayFrom(arguments).map((key) => (obj[key] = this._provider.getItem(key))) && obj
      : this._provider.getItem(arguments[0])
  }
  set(key, value) {
    typeof key === 'object'
      ? Object.keys(key).forEach((name) => this._provider.setItem(name, key[name]))
      : this._provider.setItem(key, value)
  }
  remove() {
    arguments.length > 1
      ? this._arrayFrom(arguments).forEach((key) => this._provider.removeItem(key))
      : this._provider.removeItem(arguments[0])
  }
  has(key) {
    return this._provider.getItem(key) !== null
  }
  _arrayFrom(args) {
    return Array.from(args)
  }
}

const storage = new Storage(sessionStorage)

export default storage
