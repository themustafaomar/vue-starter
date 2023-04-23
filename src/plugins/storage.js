class Storage {
  constructor(provider) {
    this._provider = provider
  }
  get(key) {
    return this._provider.getItem(key)
  }
  getMany() {
    const data = {}
    Array.from(arguments).forEach((key, v) => {
      data[key] = this.get(key)
    })
    return data
  }
  create(key, value) {
    this._provider.setItem(key, value)
  }
  createMany(object) {
    Object.keys(object).forEach((key) => this.store(key, object[key]))
  }
  has(key) {
    return this._provider.getItem(key) !== null
  }
  remove(key) {
    this._provider.removeItem(key)
  }
  removeMany() {
    Array.from(arguments).forEach((key) => this.remove(key))
  }
}

const storage = new Storage(localStorage)

export default storage
