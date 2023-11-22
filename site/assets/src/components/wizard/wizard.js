import { LitElement, html } from "lit"


const ZumeWizards = {
    makeAPlan: 'getting-started',
    connectToCoach: 'connect-to-coach',
    joinAPlan: 'join-a-training',
}
const ZumeWizardModules = {
    completeProfile: 'completeProfile',
    makePlan: 'makePlan',
    inviteFriends: 'inviteFriends',
    connectToCoach: 'connectToCoach',
    joinPlan: 'joinPlan',
}
const ZumeWizardSteps = {
    updateName: 'update-your-name',
    updateLocation: 'update-your-location',
    updatePhone: 'update-your-phone',
}

const wizardSteps = {
    [ZumeWizardSteps.updateName]: {
                        slug: ZumeWizardSteps.updateName,
                        component: (step, t) => html`
                            <complete-profile
                                name=${step.slug}
                                module=${step.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="name"
                            ></complete-profile>
                        `
                    },
    [ZumeWizardSteps.updateLocation]: {
                        slug: ZumeWizardSteps.updateLocation,
                        component: (step, t) => html`
                            <complete-profile
                                name=${step.slug}
                                module=${step.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="location"
                            ></complete-profile>
                        `
                    },
    [ZumeWizardSteps.updatePhone]: {
                        slug: ZumeWizardSteps.updatePhone,
                        component: (step, t) => html`
                            <complete-profile
                                name=${step.slug}
                                module=${step.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="phone"
                            ></complete-profile>
                        `
                    }
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
        this.t = window.SHAREDFUNCTIONS.escapeObject(jsObject.translations)

        this._handleHistoryPopState = this._handleHistoryPopState.bind(this)
        window.addEventListener('popstate', this._handleHistoryPopState)
    }


    render() {
        if (!this.isWizardLoaded()) {
            this.loadWizard()
            this._handleHistoryPopState()
        }

        if (this.steps.length === 0) {
            return html`
            <div class="cover">
                <h1 class="brand">${this.t.bad_wizard}</h1>
                <p>${this.t.found_bad_wizard}</p>
                <div class="center"><img class="w-20" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                <a href="/">${this.t.home}</a>
            </div>`
        }



        return html`
        <div class="cover container center">

            ${this.currentStep()}

            <div class="stack-1 | fixed bottom left right p-2">
                ${this.navigationButtons()}
                ${this.stepCounter()}
            </div>

        </div>
        `
    }

    currentStep() {
        const currentStep = this.steps[this.stepIndex]

        return currentStep.component(currentStep, this.t)
    }

    navigationButtons() {
        const { skippable } = this.step

        const isFirstStep = this.stepIndex === 0
        const isLastStep = this.stepIndex === this.steps.length - 1

        return html`
        <div class="text-center d-flex justify-content-between">
            ${ !isFirstStep ? (
                html`<button @click=${this._onBack} class="btn outline ">${this.t.back}</button>`
            ) : ''}
            <div class="cluster ms-auto">
                ${ skippable && !isLastStep ? (
                    html`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`
                ) : ''}
                ${ !isLastStep ? (
                    html`<button @click=${this._onNext} class="btn">${this.t.next}</button>`
                ) : ''}
                ${ isLastStep ? (
                    html`<button @click=${this._onFinish} class="btn">${this.t.finish}</button>`
                ) : '' }
            </div>
        </div>
        `
    }

    stepCounter() {

        return html`
        <div class="center">
            <div class="cluster">
                ${this.steps.map((step, i) => {
                    const completed = i <= this.stepIndex
                    return html`<div class="step-circle ${completed ? 'complete' : ''}"></div>`
                })}
            </div>
        </div>
        <div class="text-center">
            ${this.stepIndex + 1} / ${this.steps.length}
        </div>
        `
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
        }
    }
    _onSkip() {
        /* Go to the next module? */
        const currentModule = this.step.module
        for (let i = this.stepIndex + 1; i < this.steps.length - 1; i++) {
            const step = this.steps[i];
            if ( step.module !== currentModule ) {
                this._gotoStep(i)
                return
            }
        }
        this._onFinish()
    }
    _onFinish() {
        if ( !this.finishUrl ) {
            window.location.href = '/'
        }

        window.location.href = this.finishUrl
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
    _handleHistoryPopState() {
        const url = new URL(window.location.href)
        const urlParts = url.pathname.split('/')
        const path = urlParts[urlParts.length - 1]

        if ( Object.values(ZumeWizards).includes(path) ) {
            this._gotoStep(0, false)
        }

        this.steps.forEach(({slug}, i) => {
            if ( path === slug ) {
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
                        component: (step) => html`
                            <h1>Make a plan</h1>
                            <p>We would like to help you succeed with this training.</p>
                            <p>Making a plan can help you with success.</p>
                            <p>Answering the following questions will help us make you a plan.</p>
                            <p>Or you can skip if you prefer</p>
                        `
                    },
                    {
                        slug: 'how-many-sessions',
                        component: (step) => html`
                            <h1>Will you do 1 or 2 hour training sessions?</h1>
                            <div class="stack">
                                <button class="btn">1 hour (20 sessions)</button>
                                <button class="btn">2 hour (10 sessions)</button>
                            </div>
                        `
                    },
                    {
                        slug: 'what-time-of-day',
                        component: (step) => html`
                            <h1>What time of day?</h1>
                            <div class="stack">
                                <button class="btn">Morning</button>
                                <button class="btn">Afternoon</button>
                                <button class="btn">Evening</button>
                            </div>
                        `
                    },
                    {
                        slug: 'what-time-interval',
                        component: (step) => html`
                            <h1>How often will you meet?</h1>
                            <div class="stack">
                                <button class="btn">Every day</button>
                                <button class="btn">Once a week</button>
                                <button class="btn">Twice a month</button>
                                <button class="btn">Once a month</button>
                            </div>
                        `
                    },
                    {
                        slug: 'when-will-you-start',
                        component: (step) => html`
                            <h1>When do you plan to start?</h1>
                            <input type="date">
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
                            <h1>Invite your friends to join your training</h1>
                            <p>Share the link below with your friends so that they can join your training.</p>
                            <p><a href="https://zume.training/zume_app/friend-invite?123456">https://zume.training/zume_app/friend-invite?123456</a></p>
                            <p>Alternatively your friends can scan this QR code in order to join.</p>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zume5.training/zume_app/friend_invite?code=123456" alt="" />
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.connectToCoach]: {
                steps: [
                    {
                        slug: 'contact-preference',
                        component: (step) => html`
                            <h1>What is your contact preference?</h1>
                            <label for="email">Email</label>
                            <input type="checkbox" name="contact-preference" id="email" value="email" />
                            <label for="text">Text</label>
                            <input type="checkbox" name="contact-preference" id="text" value="text" />
                            <label for="phone">Phone</label>
                            <input type="checkbox" name="contact-preference" id="phone" value="phone" />
                            <label for="whatsapp">Whatsapp</label>
                            <input type="checkbox" name="contact-preference" id="whatsapp" value="whatsapp" />
                        `
                    },
                    {
                        slug: 'language-preference',
                        component: (step) => html`
                            <h1>What is your language preference?</h1>
                            <label for="language">Language Preference</label>
                            <input type="text" name="language-preference" id="language"/>
                        `
                    },
                    {
                        slug: 'how-can-we-serve',
                        component: (step) => html`
                            <h1>How can we serve you?</h1>
                            <label for="coaching">Coaching</label>
                            <input type="checkbox" name="contact-preference" id="coaching" value="coaching" />
                            <label for="technical">Technical Assistance</label>
                            <input type="checkbox" name="contact-preference" id="technical" value="technical" />
                            <label for="implementation">Question about implementing the training</label>
                            <input type="checkbox" name="contact-preference" id="implementation" value="implementation" />
                            <label for="content">Question about the content</label>
                            <input type="checkbox" name="contact-preference" id="content" value="content" />
                            <label for="group-started">Help with what to do after starting a group</label>
                            <input type="checkbox" name="contact-preference" id="group-started" value="group-started" />
                        `
                    },
                    {
                        slug: 'connected-to-coach',
                        component: (step) => html`
                            <h1>Connecting you to a Coach</h1>
                            <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                            <p>Successfully connected you. One of our team will contact you in the next 24-48 hours</p>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.joinPlan]: {
                steps: [
                    {
                        slug: 'joined-training',
                        component: (step) => html`
                            <h1>Joining Plan</h1>
                            <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                            <p>Successfully joined plan</p>
                        `
                    }
                ]
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
                const step = {
                    component,
                    slug,
                    module: moduleName,
                    skippable,
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
                [ZumeWizardModules.inviteFriends]: this.getModule(ZumeWizardModules.inviteFriends, true),
            },
            [ZumeWizards.connectToCoach]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                    ZumeWizardSteps.updatePhone,
                ]),
                [ZumeWizardModules.connectToCoach]: this.getModule(ZumeWizardModules.connectToCoach),
            },
            [ZumeWizards.joinAPlan]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                    ZumeWizardSteps.updatePhone,
                ]),
                [ZumeWizardModules.joinPlan]: this.getModule(ZumeWizardModules.joinPlan),
            }
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