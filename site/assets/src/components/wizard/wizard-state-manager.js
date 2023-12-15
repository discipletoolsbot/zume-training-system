export class WizardStateManager {
    WIZARD_STATE_NAME = 'zume_wizard_state'
    STALE_LIFESPAN = 10 * 60 * 1000
    MAX_LIFESPAN = 60 * 60 * 1000

    #wizardState;

    constructor(moduleName) {
        this.moduleName = moduleName

        this.#wizardState = this.#init()
    }

    #init() {
        const existingState = this.#get()

        if ( existingState && !this.#isOlderThan(existingState, this.MAX_LIFESPAN) ) {
            return existingState
        }

        return ({
            module: this.moduleName,
            data: {},
            timestamp: Date.now(),
        })
    }

    #get() {
        return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))
    }

    #refreshTimestamp() {
        this.#wizardState.timestamp = Date.now()
    }

    #isOlderThan(state, milliseconds) {
        return Date.now() - state.timestamp > milliseconds
    }

    empty() {
        return Object.keys(this.#wizardState.data).length === 0
    }

    isDataStale() {
        return this.#isOlderThan(this.#wizardState, this.STALE_LIFESPAN)
    }

    get( key ) {
        return this.#wizardState.data[key]
    }

    getAll() {
        return this.#wizardState.data
    }

    add(key, value) {
        this.#wizardState.data[key] = value

        this.#refreshTimestamp()

        localStorage.setItem(this.WIZARD_STATE_NAME, JSON.stringify(this.#wizardState))
    }

    clear() {
        this.#wizardState = null

        localStorage.removeItem(this.WIZARD_STATE_NAME)
    }
}