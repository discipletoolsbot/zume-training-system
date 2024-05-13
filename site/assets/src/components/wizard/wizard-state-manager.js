export class WizardStateManager {
    WIZARD_STATE_NAME = 'zume_wizard_state'
    STALE_LIFESPAN = 10 * 60 * 1000
    MAX_LIFESPAN = 60 * 60 * 1000

    #wizardState;
    moduleName;

    constructor(moduleName) {
        this.moduleName = moduleName

        this.#wizardState = this.#init()
    }

    #init() {
        const existingState = this.#load()

        if ( existingState && !this.#isOlderThan(existingState, this.MAX_LIFESPAN) && existingState.module === this.moduleName ) {
            return existingState
        }

        return this.#createEmpty()
    }

    #createEmpty() {
        return ({
            module: this.moduleName,
            data: {},
            timestamp: Date.now(),
        })
    }

    #load() {
        return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))
    }

    #save() {
        this.#refreshTimestamp()

        localStorage.setItem(this.WIZARD_STATE_NAME, JSON.stringify(this.#wizardState))
    }

    #refreshTimestamp() {
        this.#wizardState.timestamp = Date.now()
    }

    #isOlderThan(state, milliseconds) {
        return Date.now() - state.timestamp > milliseconds
    }

    isEmpty() {
        return Object.keys(this.#wizardState.data).length === 0
    }

    isDataStale() {
        return this.#isOlderThan(this.#wizardState, this.STALE_LIFESPAN)
    }

    has( key ) {
        return Object.prototype.hasOwnProperty.call(this.#wizardState.data, key)
    }

    get( key ) {
        return this.#wizardState.data[key]
    }

    getAll() {
        return this.#wizardState.data
    }

    add(key, value) {
        this.#wizardState.data[key] = value

        this.#save()
    }
    remove(key) {
        delete this.#wizardState.data[key]

        this.#save()
    }

    clear() {
        this.#wizardState = this.#createEmpty()

        localStorage.removeItem(this.WIZARD_STATE_NAME)
    }
}