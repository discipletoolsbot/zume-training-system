import { LitElement, html } from "lit"


const ZumeWizards = {
    makeAPlan: 'make-a-plan',
    connectToCoach: 'connect-to-coach',
}
const ZumeWizardModules = {
    completeProfile: 'completeProfile',
    makePlan: 'makePlan',
    inviteFriends: 'inviteFriends',
    connectToCoach: 'connectToCoach',
}

export class Wizard extends LitElement {
    static get properties() {
        return {
            /**
             * The wizard type
             */
            type: { type: String },
            /**
             * Address to go to when the wizard is finished
             */
            finishUrl: { type: String },
            /**
             * The step that is currently being shown
             */
            step: { attribute: false },
        }
    }

    constructor() {
        super()
        this.stepIndex = 0
        this.steps = []
        this.modules = {}
        this.step = {}
    }

    render() {
        if (!this.isWizardLoaded()) {
            this.loadWizard()
        }

        if (this.steps.length === 0) {
            return html`
            <div class="cover">
                <h1 class="brand">Bad Wizard</h1>
                <p>You found a bad wizard</p>
                <div class="center"><img class="w-20" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                <a href="/">Get Back Home</a>
            </div>`
        }



        return html`
        <div class="cover | s5">

            ${this.currentStep()}
            ${this.navigationButtons()}

        </div>
        `
    }

    currentStep() {
        if (this.steps.length === 0) {
            return html`<div class="cover">
                <h1 class="brand">Bad Wizard</h1>
                <p>You found a bad wizard</p>
                <div class="center"><img class="w-20" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
            </div>`
        }

        const currentStep = this.steps[this.stepIndex]

        return currentStep.component(currentStep)
    }

    navigationButtons() {
        const { skippable } = this.step

        const isFirstStep = this.stepIndex === 0
        const isLastStep = this.stepIndex === this.steps.length - 1

        return html`
        <div>
            ${ !isFirstStep ? (
                html`<button @click=${this._onBack} class="btn outline ">Back</button>`
            ) : ''}
            ${ !isLastStep ? (
                html`<button @click=${this._onNext} class="btn">Next</button>`
            ) : ''}
            ${ skippable && !isLastStep ? (
                html`<button @click=${this._onSkip} class="btn outline">Skip</button>`
            ) : ''}
            ${ isLastStep ? (
                html`<button @click=${this._onFinish} class="btn">Finish</button>`
            ) : '' }
        </div>
        `
    }

    _onBack() {
        if ( this.stepIndex > 0 ) {
            const backStepIndex = this.stepIndex - 1
            this.gotoStep(backStepIndex)
        }
    }
    _onNext() {
        if ( this.stepIndex + 1 < this.steps.length ) {
            const nextStepIndex = this.stepIndex + 1
            this.gotoStep(nextStepIndex)
        }
    }
    _onSkip() {
        /* Go to the next module? */
        const currentModule = this.step.module
        for (let i = this.stepIndex + 1; i < this.steps.length - 1; i++) {
            const step = this.steps[i];
            console.log(currentModule, step)
            if ( step.module !== currentModule ) {
                this.gotoStep(i)
                return
            }
        }
        this._onFinish()
    }
    _onFinish() {
        console.log('go to finish')

        if ( !this.finishUrl ) {
            window.location.href = '/'
        }

        window.location.href = this.finishUrl
    }

    gotoStep(index) {
        this.stepIndex = this.clampSteps(index)
        this.step = this.steps[this.stepIndex]
    }
    clampSteps(index) {
        let clampedIndex = index
        if ( index > this.steps.length - 1 ) {
            clampedIndex = this.steps.length - 1
        }
        if ( index < 0 ) {
            clampedIndex = 0
        }
        return clampedIndex
    }

    getModule( moduleName, skippable = false ) {
        const modules = {
            [ZumeWizardModules.completeProfile]: {
                steps: [
                    {
                        slug: 'update-your-profile',
                        component: (step) => html`
                            <h1>Complete your Profile</h1>
                            <div>
                                <p>This is part of ${step.module}</p>
                                <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                            </div>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.makePlan]: {
                steps: [
                    {
                        slug: 'make-your-plan',
                        component: (step) => html`
                            <h1>Make your plan</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                    {
                        slug: 'what-time-of-day',
                        component: (step) => html`
                            <h1>what Time of Day</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                    {
                        slug: 'how-many-sessions',
                        component: (step) => html`
                            <h1>How Many Sessions</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.inviteFriends]: {
                steps: [
                    {
                        slug: 'invite-your-friends',
                        component: (step) => html`
                            <h1>Invite your friends</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                    {
                        slug: 'via-what-method',
                        component: (step) => html`
                            <h1>Use this QR or link or we can email them to you.</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.connectToCoach]: {
                steps: [
                    {
                        slug: 'connected-to-coach',
                        component: (step) => html`
                            <h1>You are now connected to a coach</h1>
                            <p>One of our team will contact you in the next 24-48 hours</p>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                ],
                skippable,
            },
        }

        const moduleNames = Object.keys(modules)

        if ( !moduleNames.includes(moduleName) ) {
            return modules[ZumeWizardModules.completeProfile]
        }

        return modules[moduleName]
    }

    isWizardLoaded() {
        return Object.keys(this.modules).length !== 0
    }

    loadWizard() {
        const wizard = this.getWizard()
        this.modules = wizard
        this.steps = []
        Object.entries(this.modules).forEach(([moduleName, { steps, skippable }]) => {
            steps.forEach(({ component, slug }) => {
                const step = {
                    component,
                    slug,
                    module: moduleName,
                    skippable,
                }

                this.steps.push(step)
            })
        })
        this.gotoStep(0)
    }

    isWizardTypeValid() {
        const wizardTypes = Object.values(ZumeWizards)

        if (!wizardTypes.includes(this.type)) {
            return false
        }

        return true
    }

    getWizard() {
        if (!this.isWizardTypeValid()) {
            return {}
        }

        const wizards = {
            [ZumeWizards.makeAPlan]: {
                [ZumeWizardModules.completeProfile]: this.getModule(ZumeWizardModules.completeProfile, true),
                [ZumeWizardModules.makePlan]: this.getModule(ZumeWizardModules.makePlan, true),
                [ZumeWizardModules.inviteFriends]: this.getModule(ZumeWizardModules.inviteFriends, true),
            },
            [ZumeWizards.connectToCoach]: {
                [ZumeWizardModules.completeProfile]: this.getModule(ZumeWizardModules.completeProfile),
                [ZumeWizardModules.connectToCoach]: this.getModule(ZumeWizardModules.connectToCoach),
            },
        }

        return wizards[this.type]
    }



    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}

window.customElements.define( 'zume-wizard', Wizard )