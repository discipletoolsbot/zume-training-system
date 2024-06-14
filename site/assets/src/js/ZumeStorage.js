class ZumeStorage {
    static prefix = 'Z5_'

    static save(key, value) {
        localStorage.setItem(this.createKey(key), JSON.stringify(value))
    }

    static load(key) {
        const value = localStorage.getItem(this.createKey(key))

        try {
            return JSON.parse(value)
        } catch (error) {
            return value
        }
    }

    static createKey(key) {
        return this.prefix + key
    }
}

window.ZumeStorage = ZumeStorage