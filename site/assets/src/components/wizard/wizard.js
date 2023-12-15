import { LitElement, html, css } from "lit"
import { ZumeWizardModules, ZumeWizardSteps, ZumeWizardStepsConnectedFields as ConnectedFields, ZumeWizards } from "./wizard-constants"
import { WizardStateManager } from "./wizard-state-manager"

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
             * Logged in user profile
             */
            user: { type: Object },
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
        this.t = window.SHAREDFUNCTIONS.escapeObject(jsObject.translations)

        this._handleHistoryPopState = this._handleHistoryPopState.bind(this)
        window.addEventListener('popstate', this._handleHistoryPopState)

        this.stateManager = new WizardStateManager()
    }

    render() {
        if (!this.isWizardLoaded()) {
            this.loadWizard()
            this._handleHistoryPopState( true )
        }


        if (this.steps.length === 0) {
            return html`
            <div class="cover-page">
                <div class="stack center | text-center">
                    <h1 class="brand">${this.t.bad_wizard}</h1>
                    <p>${this.t.found_bad_wizard}</p>
                    <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                    <a class="btn" href="/">${this.t.home}</a>
                </div>
            </div>`
        }

        return html`
        <div class="container center">

            <header class="py-1 px--4 w-100 position-relative">
                <div class="text-end" id="wizard-skip-button">${this.skipButton()}</div>
                <div class="center">${this.stepCounter()}</div>
            </header>

            <article class="container-xsm center text-center">
                ${this.currentStep()}
            </article>

            <footer class="stack-1 | fixed bottom left right p-2">
                ${this.footer()}
            </footer>

        </div>
        `
    }

    currentStep() {
        const currentStep = this.steps[this.stepIndex]

        return currentStep.component(currentStep, this.t, 'w-100')
    }

    skipButton() {
        const { skippable } = this.step
        const isLastStep = this.stepIndex === this.steps.length - 1

        if ( skippable && !isLastStep ) {
            return html`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`
        }

        return ''
    }

    finishButton() {

        return html`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._onFinish} class="btn">${this.t.finish}</button>
                </div>
            </div>
        `
    }

    stepCounter() {
        return html`
            <div class="cluster">
                ${this.steps.map((step, i) => {
                    const completed = i <= this.stepIndex
                    return html`<div class="step-circle ${completed ? 'complete' : ''}"></div>`
                })}
            </div>
        `
    }

    footer() {
        const isLastStep = this.stepIndex === this.steps.length - 1

        return isLastStep ? this.finishButton() : ''
    }

    _onBack() {
        if ( this.stepIndex > 0 ) {
            const backStepIndex = this.stepIndex - 1
            this._gotoStep(backStepIndex)
        }
    }
    _onNext() {
        if ( this.stepIndex + 1 < this.steps.length ) {
            const nextStepIndex = this.stepIndex + 1
            this._gotoStep(nextStepIndex)
        } else {
            this._onFinish()
        }
    }
    _onSkip() {
        /* Go to the next module? */
        const currentModule = this.step.module
        for (let i = this.stepIndex + 1; i < this.steps.length; i++) {
            const step = this.steps[i];
            if ( step.module !== currentModule ) {
                this._gotoStep(i)
                return
            }
        }
        this._onFinish()
    }
    _onFinish() {
        this.stateManager.clear()

        if ( !this.finishUrl ) {
            window.location.href = '/'
        }

        const url = new URL( this.finishUrl )

        if ( this.type === ZumeWizards.checkin ) {
            /* TODO: after checkin send them to the HOST dashboard */
            url.searchParams.set( 'completed', this.type )
        } else {
            url.searchParams.set( 'completed', this.type )
        }

        window.location.href = url
    }

    _gotoStep(index, pushState = true) {
        if ( this.steps.length === 0 ) {
            return
        }

        this.stepIndex = this.clampSteps(index)
        this.step = this.steps[this.stepIndex]

        if ( pushState ) {
            const url = new URL(window.location.href)
            const urlParts = url.pathname.split('/')
            const slug = urlParts[urlParts.length - 1]

            let newUrl = ''
            if ( Object.values(ZumeWizards).includes(slug) ) { // first load of the wizard
                newUrl = urlParts.join('/') + '/' + this.step.slug + url.search
            } else {
                newUrl = urlParts.slice(0, -1).join('/') + '/' + this.step.slug + url.search
            }

            window.history.pushState( null, null, newUrl )
        }
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
    _handleHistoryPopState( goToBeginningOfModule = false ) {
        const url = new URL(window.location.href)
        const urlParts = url.pathname.split('/')
        const path = urlParts[urlParts.length - 1]

        if ( Object.values(ZumeWizards).includes(path) ) {
            this._gotoStep(0, false)
        }

        let currentModule = ''
        let beginningOfModule = 0
        this.steps.forEach(({slug, module}, i) => {
            if ( currentModule !== module ) {
                currentModule = module
                beginningOfModule = i
            }

            if ( path === slug ) {
                if (goToBeginningOfModule === true && this.stateManager.isDataStale()) {
                    this._gotoStep(beginningOfModule)
                    return
                }

                this._gotoStep(i, false)
            }
        })

    }

    makeModule( stepNames = [], skippable = false ) {

        const module = {
            steps: [],
            skippable,
        }

        stepNames.forEach(stepName => {
            if ( !Object.keys(wizardSteps).includes(stepName) ) {
                return
            }
            module.steps.push(wizardSteps[stepName])
        });

        return module
    }

    getModule( moduleName, skippable = false ) {
        const modules = {
            [ZumeWizardModules.completeProfile]: {
                steps: [
                    wizardSteps[ZumeWizardSteps.updateName],
                    wizardSteps[ZumeWizardSteps.updateLocation],
                ],
                skippable,
            },
            [ZumeWizardModules.makePlan]: {
                steps: [
                    {
                        slug: 'make-a-plan',
                        component: (step, t, classes) => html`
                            <div class=${`stack ${classes}`}>
                                <h2>Make a plan</h2>
                                <p>We would like to help you succeed with this training.</p>
                                <p>Making a plan can help you with success.</p>
                                <p>Answering the following questions will help us make you a plan.</p>
                                <p>Or you can skip if you prefer</p>
                                <button class="btn" @click=${step.doneHandler}>OK</button>
                            </div>
                        `
                    },
                    {
                        slug: 'how-many-sessions',
                        component: (step, t, classes) => html`
                            <div class=${`stack ${classes}`}>
                                <h2>Will you do 1 or 2 hour training sessions?</h2>
                                <div class="stack">
                                    <button class="btn" @click=${step.doneHandler}>1 hour (20 sessions)</button>
                                    <button class="btn" @click=${step.doneHandler}>2 hour (10 sessions)</button>
                                </div>
                            </div>
                        `
                    },
                    {
                        slug: 'what-time-of-day',
                        component: (step, t, classes) => html`
                            <div class=${`stack ${classes}`}>
                                <h2>What time of day?</h2>
                                <div class="stack">
                                    <button class="btn" @click=${step.doneHandler}>Morning</button>
                                    <button class="btn" @click=${step.doneHandler}>Afternoon</button>
                                    <button class="btn" @click=${step.doneHandler}>Evening</button>
                                </div>
                            </div>
                        `
                    },
                    {
                        slug: 'what-time-interval',
                        component: (step, t, classes) => html`
                            <div class=${`stack ${classes}`}>
                                <h2>How often will you meet?</h2>
                                <div class="stack">
                                    <button class="btn" @click=${step.doneHandler}>Every day</button>
                                    <button class="btn" @click=${step.doneHandler}>Once a week</button>
                                    <button class="btn" @click=${step.doneHandler}>Twice a month</button>
                                    <button class="btn" @click=${step.doneHandler}>Once a month</button>
                                </div>
                            </div>
                        `
                    },
                    {
                        slug: 'when-will-you-start',
                        component: (step, t, classes) => html`
                            <div class=${`stack ${classes}`}>
                                <h2>When do you plan to start?</h2>
                                <input type="date">
                                <button class="btn" @click=${step.doneHandler}>Done</button>
                            </div>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.inviteFriends]: {
                steps: [ wizardSteps[ZumeWizardSteps.inviteFriends] ],
                skippable,
            },
            [ZumeWizardModules.joinTraining]: {
                steps: [ wizardSteps[ZumeWizardSteps.joinTraining] ],
            }
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
                /* Skip if the corresponding field exists in the user */
                const connectedField = ConnectedFields[slug]
                let connectedFieldValue = null
                if ( connectedField && this.user) {
                    if ( connectedField.testExistance(this.user[connectedField.field]) ) {
                        return
                    }
                    connectedFieldValue = this.user[connectedField.field]
                }

                const step = {
                    component,
                    slug,
                    module: moduleName,
                    skippable,
                    doneHandler: this._onNext,
                }

                if ( connectedFieldValue !== null ) {
                    step.value = connectedFieldValue
                }

                this.steps.push(step)
            })
        })
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
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                ], true),
                [ZumeWizardModules.makePlan]: this.getModule(ZumeWizardModules.makePlan, true),
                [ZumeWizardModules.inviteFriends]: this.makeModule([
                    ZumeWizardSteps.inviteFriends,
                ], true),
            },
            [ZumeWizards.getACoach]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                    ZumeWizardSteps.updatePhone,
                ]),
                [ZumeWizardModules.getACoach]: this.makeModule([
                    ZumeWizardSteps.contactPreferences,
                    ZumeWizardSteps.languagePreferences,
                    ZumeWizardSteps.howCanWeServe,
                    ZumeWizardSteps.connectingToCoach,
                ], true),
            },
            [ZumeWizards.joinAPlan]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                    ZumeWizardSteps.updatePhone,
                ]),
                [ZumeWizardModules.joinTraining]: this.getModule(ZumeWizardModules.joinTraining),
            },
            [ZumeWizards.connectWithFriend]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                ], true),
                [ZumeWizardModules.connectFriend]: this.makeModule([
                    ZumeWizardSteps.connectToFriend,
                ])
            },
            [ZumeWizards.joinFriendsPlan]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                ], true),
                [ZumeWizardModules.joinFriendsTraining]: this.makeModule([
                    ZumeWizardSteps.joinFriendsPlan,
                ])
            },
            [ZumeWizards.checkin]: {
                [ZumeWizardModules.checkin]: this.makeModule([
                    ZumeWizardSteps.checkinSubmit,
                ])
            },
        }

        return wizards[this.type]
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('popstate', this._handleHistoryPopState)
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}

window.customElements.define( 'zume-wizard', Wizard )

const wizardSteps = {
    [ZumeWizardSteps.updateName]: {
        slug: ZumeWizardSteps.updateName,
        component: (step, t, classes) => html`
            <complete-profile
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t="${t.complete_profile}"
                variant=${ZumeWizardSteps.updateName}
                @done-step=${step.doneHandler}
                value=${JSON.stringify(step.value)}
            ></complete-profile>
        `
    },
    [ZumeWizardSteps.updateLocation]: {
        slug: ZumeWizardSteps.updateLocation,
        component: (step, t, classes) => html`
            <complete-profile
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t="${t.complete_profile}"
                variant=${ZumeWizardSteps.updateLocation}
                @done-step=${step.doneHandler}
                value=${JSON.stringify(step.value)}
            ></complete-profile>
        `
    },
    [ZumeWizardSteps.updatePhone]: {
        slug: ZumeWizardSteps.updatePhone,
        component: (step, t, classes) => html`
            <complete-profile
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t="${t.complete_profile}"
                variant=${ZumeWizardSteps.updatePhone}
                @done-step=${step.doneHandler}
                value=${JSON.stringify(step.value)}
            ></complete-profile>
        `
    },
    [ZumeWizardSteps.contactPreferences]: {
        slug: ZumeWizardSteps.contactPreferences,
        component: (step, t, classes) => html`
            <request-coach
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t="${t.get_a_coach}"
                variant=${ZumeWizardSteps.contactPreferences}
                @done-step=${step.doneHandler}
            ></request-coach>
        `
    },
    [ZumeWizardSteps.languagePreferences]: {
        slug: ZumeWizardSteps.languagePreferences,
        component: (step, t, classes) => html`
            <request-coach
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t="${t.get_a_coach}"
                variant=${ZumeWizardSteps.languagePreferences}
                @done-step=${step.doneHandler}
            ></request-coach>
        `
    },
    [ZumeWizardSteps.howCanWeServe]: {
        slug: ZumeWizardSteps.howCanWeServe,
        component: (step, t, classes) => html`
            <request-coach
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t="${t.get_a_coach}"
                variant=${ZumeWizardSteps.howCanWeServe}
                @done-step=${step.doneHandler}
            ></request-coach>
        `
    },
    [ZumeWizardSteps.connectingToCoach]: {
        slug: ZumeWizardSteps.connectingToCoach,
        component: (step, t, classes) => html`
            <request-coach
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t="${t.get_a_coach}"
                variant=${ZumeWizardSteps.connectingToCoach}
                @done-step=${step.doneHandler}
            ></request-coach>
        `
    },
    [ZumeWizardSteps.inviteFriends]: {
        slug: ZumeWizardSteps.inviteFriends,
        component: (step, t, classes) => html`
            <invite-friends
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t=${t.share}
            ></invite-friends>
        `
    },
    [ZumeWizardSteps.joinTraining]: {
        slug: ZumeWizardSteps.joinTraining,
        component: (step, t, classes) => html`
            <join-training
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t=${t.join_training}
                @done-step=${step.doneHandler}
            ></join-training>
        `
    },
    [ZumeWizardSteps.joinFriendsPlan]: {
        slug: ZumeWizardSteps.joinFriendsPlan,
        component: (step, t, classes) => html`
            <join-friends-training
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t=${t.join_training}
                @done-step=${step.doneHandler}
            ></join-friends-training>
        `
    },
    [ZumeWizardSteps.connectToFriend]: {
        slug: ZumeWizardSteps.connectToFriend,
        component: (step, t, classes) => html`
            <connect-friend
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t=${t.connect_friend}
                @done-step=${step.doneHandler}
            ></connect-friend>
        `
    },
    [ZumeWizardSteps.checkinSubmit]: {
        slug: ZumeWizardSteps.checkinSubmit,
        component: (step, t, classes) => html`
            <session-checkin
                class=${classes}
                name=${step.slug}
                module=${step.module}
                ?skippable=${step.skippable}
                .t=${t.checkin}
                @done-step=${step.doneHandler}
            ></session-checkin>
        `
    }
}
