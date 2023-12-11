export class WizardStateManager {
    WIZARD_STATE = 'zume_wizard_state'

    constructor(moduleName) {
        this.moduleName = moduleName
    }

    init() {
        return ({
            module: this.moduleName,
            data: {},
        })
    }

    exists() {
        return localStorage.getItem(this.WIZARD_STATE) ? true : false
    }

    get() {
        return JSON.parse(localStorage.getItem(this.WIZARD_STATE))
    }

    add(key, value) {
        const wizardState = !this.exists() ? this.init() : this.get()
        wizardState.data[key] = value

        localStorage.setItem(this.WIZARD_STATE, JSON.stringify(wizardState))
    }

    clear() {
        localStorage.removeItem(this.WIZARD_STATE)
    }
}