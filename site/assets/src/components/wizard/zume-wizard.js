import { LitElement, html } from "lit"
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
             * Wizard translation strings
             */
            translations: { type: Object },
            /**
             * Wizard translation strings
             */
            noUrlChange: { type: Boolean },
            /**
             * The step that is currently being shown
             */
            step: { attribute: false },
            /**
             * The array of steps
             */
            steps: { attribute: false },
            /**
             * Is a step running an API request
             */
            loading: { attribute: false },
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

    resetWizard() {
        this.modules = {}
    }

    firstUpdated() {
        if (this.translations) {
            this.t = window.SHAREDFUNCTIONS.escapeObject(this.translations)
        }
    }

    willUpdate(properties) {
        if (properties.has('type') && this.type === '') {
            this.resetWizard()
        }
    }

    render() {
        if (!this.isWizardLoaded()) {
            const wizard = this.getWizard(this.type)
            this.loadWizard( wizard )
            this._handleHistoryPopState( true )
        }

        if (!this.isWizardTypeValid( this.type )) {
            return html`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.bad_wizard}</h1>
                        <p>${this.t.found_bad_wizard}</p>
                        <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                        <a class="btn" href="/">${this.t.home}</a>
                    </div>
                </div>
            `
        }

        if (this.steps.length === 0) {
            return html`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.completed_wizard_title}</h1>
                        <p>${this.t.completed_wizard_text}</p>
                        ${this.finishButton()}
                    </div>
                </div>
            `
        }

        return html`
        <div class="container center">

            <header class="py-1 px--4 w-100 position-relative">
                <div class="text-end" id="wizard-skip-button">${this.headerButtons()}</div>
                <div class="center">${this.stepCounter()}</div>
            </header>

            <article class="${this.containerSize()} center text-center">
                ${this.currentStep()}
            </article>

            <footer class="stack-1 ${this.containerSize()} | my-3">
                ${this.footer()}
            </footer>

        </div>
        `
    }

    /**
     * Is this hacky? Either we have the container size of the wizard contents controlled here
     * or we control it within the content, but then you have to keep all steps with the same container
     * or we do as here and have some steps that are allowed to be wider because they need the space like a table
     * but this section shouldn't have to know about the internal workings of a section
     */
    containerSize() {
        const currentStep = this.steps[this.stepIndex]

        if (currentStep.slug = ZumeWizardSteps.joinTraining) {
            return 'container-md'
        }

        return 'container-xsm'
    }

    currentStep() {
        const currentStep = this.steps[this.stepIndex]

        return currentStep.component(currentStep, this.t, 'w-100')
    }

    headerButtons() {
        const { skippable } = this.step
        const isLastStep = this.stepIndex === this.steps.length - 1

        return html`
        <div class="cluster | inline s-3">
            ${( skippable && !isLastStep )
                ? html`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`
                : ''
            }
            ${( !skippable && !isLastStep && !this.noUrlChange )
                ? html`
                    <button @click=${this._onQuit} class="d-flex">
                        <svg data-src="${jsObject.images_url + '/close-button-01.svg'}" class="h-2"></svg>
                    </button>
                    `
                : ''
            }
        </div>
        `
    }

    finishButton() {

        return html`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._onFinish} ?disabled=${this.loading} class="btn ${this.loading ? 'disabled' : ''}">${this.t.finish}</button>
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
    _onQuit() {
        this._onFinish(true)
    }
    _onFinish(quit = false) {
        this.stateManager.clear()
        this.resetWizard()

        if ( !this.finishUrl ) {
            this.dispatchEvent(new CustomEvent(
                'user-state:change',
                {
                    bubbles: true,
                }
            ))
            this.dispatchEvent(new CustomEvent(
                'wizard-finished',
                {
                    bubbles: true,
                }
            ))
            return
        }

        const url = new URL( this.finishUrl )

        if ( quit === false ) {
            if ( this.type === ZumeWizards.checkin ) {
                const currentUrl = new URL( location.href )
                const code = currentUrl.searchParams.get('code')

                if ( code !== null ) {
                    const checkinDashboardUrl = new URL( jsObject.checkin_dashboard_url )
                    checkinDashboardUrl.searchParams.set( 'code', code)
                    window.location.href = checkinDashboardUrl.href
                    return
                }
            } else {
                url.searchParams.set( 'completed', this.type )
            }
        }

        window.location.href = url
    }

    _gotoStep(index, pushState = true) {
        if ( this.steps.length === 0 ) {
            return
        }

        this.stepIndex = this.clampSteps(index)
        this.step = this.steps[this.stepIndex]

        if ( pushState && !this.noUrlChange ) {
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

    _handlePlanDecision(event) {
        const decision = event.target.dataset.decision

        switch (decision) {
            case 'make':
                this.updateWizard( ZumeWizards.makeAGroup )
                break;
            case 'join':
                this.updateWizard( ZumeWizards.joinATraining )
                break;
            case 'skip':
            default:
                this._onSkip()
                break;
        }
    }

    _handleLoading(event) {
        const { loading } = event.detail

        this.loading = loading
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
            [ZumeWizardModules.planDecision]: {
                steps: [
                    {
                        slug: 'plan-decision',
                        component: (step, t, classes) => html`
                            <div class=${`stack ${classes}`}>
                                <h2>${t.join_or_start_a_training}</h2>
                                <button class="btn" data-decision="make" @click=${this._handlePlanDecision}>${t.start_a_training}</button>
                                <button class="btn" data-decision="join" @click=${this._handlePlanDecision}>${t.join_a_public_training}</button>
                                <button class="btn outline" data-decision="skip" @click=${this._handlePlanDecision}>${t.skip_for_now}</button>
                            </div>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.joinCommunity]: {
                steps: [
                    {
                        slug: 'join',
                        component: (step, t, classes) => html`
                            <div class=${`stack ${classes}`}>
                                <h2>${t.join_community}</h2>
                                <p>These are all the things that you get when you join</p>
                                <ul role="list">
                                    <li>lots of good things</li>
                                    <li>and more</li>
                                </ul>
                            </div>
                        `
                    }
                ]
            },
            [ZumeWizardModules.makePlan]: this.makeModule([
                ZumeWizardSteps.howManySessions,
                ZumeWizardSteps.whatTimeOfDay,
                ZumeWizardSteps.howOften,
                ZumeWizardSteps.startDate,
                ZumeWizardSteps.inviteFriends,
            ], skippable),
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

    loadWizard( wizard, append = false  ) {

        this.modules = wizard

        if ( append === false ) {
            this.steps = []
            this.stepIndex = 0
        }

        Object.entries(this.modules).forEach(([moduleName, { steps, skippable }]) => {

            const profile = jsObject.profile

            steps.forEach(({ component, slug }) => {
                /* Skip if the corresponding field exists in the user */
                const connectedField = ConnectedFields[slug]
                let connectedFieldValue = null

                if ( connectedField && profile) {
                    if ( connectedField.testExistance(profile[connectedField.field], profile) ) {
                        return
                    }
                    connectedFieldValue = profile[connectedField.field]
                }

                const step = {
                    component,
                    slug,
                    module: moduleName,
                    skippable,
                    doneHandler: this._onNext,
                    handleLoading: this._handleLoading,
                }

                if ( connectedFieldValue !== null ) {
                    step.value = connectedFieldValue
                }

                this.steps.push(step)
            })
        })

        if ( append === false ) {
            this._gotoStep(0)
        }
    }

    updateWizard( wizardName ) {
        const wizard = this.getWizard(wizardName)

        if ( Object.keys(wizard).length === 0 ) {
            return
        }

        this.loadWizard( wizard )
    }

    isWizardTypeValid( type ) {
        const wizardTypes = Object.values(ZumeWizards)

        if (!wizardTypes.includes(type)) {
            return false
        }

        return true
    }

    getWizard( type ) {
        if (!this.isWizardTypeValid(type)) {
            return {}
        }

        const wizards = {
            [ZumeWizards.gettingStarted]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                ], true),
                [ZumeWizardModules.planDecision]: this.getModule(ZumeWizardModules.planDecision),
            },
            [ZumeWizards.setProfile]: {
                [ZumeWizardModules.completeProfile]: this.makeModule([
                    ZumeWizardSteps.updateName,
                    ZumeWizardSteps.updateLocation,
                ], true),
            },
            [ZumeWizards.makeAGroup]: {
                [ZumeWizardModules.makePlan]: this.getModule(ZumeWizardModules.makePlan),
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
                ]),
            },
            [ZumeWizards.joinATraining]: {
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
            [ZumeWizards.joinCommunity]: {
                [ZumeWizardModules.joinCommunity]: this.getModule(ZumeWizardModules.joinCommunity)
            },
            [ZumeWizards.checkin]: {
                [ZumeWizardModules.checkin]: this.makeModule([
                    ZumeWizardSteps.checkinSubmit,
                ])
            },
        }

        return wizards[type]
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
                @loadingChange=${step.handleLoading}
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
                @loadingChange=${step.handleLoading}
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
                @loadingChange=${step.handleLoading}
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
                @loadingChange=${step.handleLoading}
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
                @loadingChange=${step.handleLoading}
            ></session-checkin>
        `
    },
    [ZumeWizardSteps.howManySessions]: {
        slug: ZumeWizardSteps.howManySessions,
        component: (step, t, classes) => html`
            <make-group
                class=${classes}
                name=${step.slug}
                module=${step.module}
                variant=${ZumeWizardSteps.howManySessions}
                ?skippable=${step.skippable}
                .t=${t.checkin}
                @done-step=${step.doneHandler}
            ></make-group>
        `
    },
    [ZumeWizardSteps.whatTimeOfDay]: {
        slug: ZumeWizardSteps.whatTimeOfDay,
        component: (step, t, classes) => html`
            <make-group
                class=${classes}
                name=${step.slug}
                module=${step.module}
                variant=${ZumeWizardSteps.whatTimeOfDay}
                ?skippable=${step.skippable}
                .t=${t.checkin}
                @done-step=${step.doneHandler}
            ></make-group>
        `
    },
    [ZumeWizardSteps.howOften]: {
        slug: ZumeWizardSteps.howOften,
        component: (step, t, classes) => html`
            <make-group
                class=${classes}
                name=${step.slug}
                module=${step.module}
                variant=${ZumeWizardSteps.howOften}
                ?skippable=${step.skippable}
                .t=${t.checkin}
                @done-step=${step.doneHandler}
            ></make-group>
        `
    },
    [ZumeWizardSteps.startDate]: {
        slug: ZumeWizardSteps.startDate,
        component: (step, t, classes) => html`
            <make-group
                class=${classes}
                name=${step.slug}
                module=${step.module}
                variant=${ZumeWizardSteps.startDate}
                ?skippable=${step.skippable}
                .t=${t.checkin}
                @done-step=${step.doneHandler}
            ></make-group>
        `
    },
}
