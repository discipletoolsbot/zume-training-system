import {
    Wizards,
    ConnectedFields,
} from "./wizard-constants";
import { wizardDefinitions } from "./wizard-definitions";

export class WizardModuleManager {
    #modules;
    #steps;
    profile;

    constructor( profile ) {
        this.#modules = {}
        this.#steps = []
        this.profile = profile
    }

    /* PRIVATE */

    #getWizard( type ) {
        if (!this.isTypeValid(type)) {
            return {}
        }

        return wizardDefinitions[type]
    }

    #updateWizard( type ) {
        const wizard = this.#getWizard(type)

        if ( typeof wizard === 'object' && Object.keys(wizard).length === 0 ) {
            return
        }

        this.#loadWizard( wizard )
    }

    #loadWizard( wizard ) {

        this.#modules = wizard

        this.#steps = []

        Object.entries(this.#modules).forEach(([moduleName, { steps, skippable }]) => {

            steps.forEach((slug) => {
                /* Skip if the corresponding field exists in the user */
                const connectedField = ConnectedFields[slug]
                let connectedFieldValue = null

                if ( connectedField && this.profile) {
                    if ( connectedField.testExistance(this.profile[connectedField.field], this.profile) ) {
                        return
                    }
                    connectedFieldValue = this.profile[connectedField.field]
                }

                const step = {
                    slug,
                    module: moduleName,
                    skippable,
                }

                if ( connectedFieldValue !== null ) {
                    step.value = connectedFieldValue
                }

                this.#steps.push(step)
            })
        })
    }

    /* PUBLIC */

    reset() {
        this.#modules = {}
    }

    isTypeValid( type ) {
        const wizardTypes = Object.values(Wizards)

        if (!wizardTypes.includes(type)) {
            return false
        }

        return true
    }

    isLoaded() {
        return Object.keys(this.#modules).length !== 0
    }

    getSteps( wizardName ) {
        this.#updateWizard(wizardName)

        return this.#steps;
    }

    updateProfile(profile) {
        this.profile = profile
    }
}