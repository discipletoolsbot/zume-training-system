export class WizardStateManager {
    WIZARD_STATE_NAME = 'zume_wizard_state'
    STALE_LIFESPAN = 10 * 60 * 1000
    MAX_LIFESPAN = 60 * 60 * 1000

    #wizardState;
    moduleName;

    static instance

    static getInstance(moduleName) {
        if (!this.instance) {
            this.instance = new WizardStateManager(moduleName)
        }
        this.instance.useModule(moduleName)
        return this.instance
    }

    constructor(moduleName) {
        this.moduleName = moduleName

        this.#init()

        this.#save()
    }

    #init() {
        const existingState = this.#load()

        if ( existingState && !this.#isOlderThan(existingState, this.MAX_LIFESPAN) ) {
            this.#wizardState = existingState
        } else {
            this.#wizardState = this.#createEmpty()
        }

        this.useModule(this.moduleName)
    }

    useModule(moduleName) {
        this.moduleName = moduleName
        if (!(this.moduleName in this.#wizardState.data)) {
            console.log('adding empty ')
            this.#wizardState.data[this.moduleName] = {}
        }
    }

    #createEmpty() {
        return ({
            data: {
                [this.moduleName]: {},
            },
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
        return Object.keys(this.#wizardState.data[this.moduleName]).length === 0
    }

    isDataStale() {
        return this.#isOlderThan(this.#wizardState, this.STALE_LIFESPAN)
    }

    has( key ) {
        return Object.prototype.hasOwnProperty.call(this.#wizardState.data[this.moduleName], key)
    }

    get( key ) {
        return this.#wizardState.data[this.moduleName][key]
    }

    getAll() {
        return this.#wizardState.data[this.moduleName]
    }

    add(key, value) {
        this.#wizardState.data[this.moduleName][key] = value

        this.#save()
    }
    remove(key) {
        delete this.#wizardState.data[this.moduleName][key]

        this.#save()
    }

    clear() {
        this.#wizardState.data[this.moduleName] = {}
        this.#refreshTimestamp()
    }
}