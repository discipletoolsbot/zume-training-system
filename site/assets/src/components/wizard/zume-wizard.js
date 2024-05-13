import { LitElement, html } from "lit"
import { html as staticHtml, literal } from "lit/static-html.js"
import { Steps,  Wizards } from "./wizard-constants"
import { WizardStateManager } from "./wizard-state-manager"
import { WizardModuleManager } from "./wizard-module-manager"

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
        this.step = {}
        this.t = window.SHAREDFUNCTIONS.escapeObject(jsObject.translations)

        this._handleHistoryPopState = this._handleHistoryPopState.bind(this)
        this._handleLoadWizard = this._handleLoadWizard.bind(this)
        this._handleGotoStep = this._handleGotoStep.bind(this)

        this.stateManager = new WizardStateManager()
    }
    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('popstate', this._handleHistoryPopState)
        window.addEventListener('wizard:load', this._handleLoadWizard)
        window.addEventListener('wizard:goto-step', this._handleGotoStep)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('popstate', this._handleHistoryPopState)
        window.removeEventListener('wizard:load', this._handleLoadWizard)
        window.removeEventListener('wizard:goto-step', this._handleGotoStep)
    }

    firstUpdated() {
        this.loadWizard()
        this._handleHistoryPopState( true )

        if (this.translations) {
            this.t = window.SHAREDFUNCTIONS.escapeObject(this.translations)
        }
    }

    willUpdate(properties) {
        if (properties.has('type') && this.type === '') {
            this.resetWizard()
        }
        if (properties.has('type') && this.type !== '') {
            this.loadWizard()
        }
    }

    loadWizard() {
        this.wizard = new WizardModuleManager( this.user )
        this.steps = this.wizard.getSteps(this.type)
        this._gotoStep(0)
    }

    resetWizard() {
        if (this.wizard) {
            this.wizard.reset()
        }
        this.steps = []
        this.step = {}
        this.stepIndex = 0
    }

    render() {
        if (!this.wizard) {
            return
        }
        if (!this.wizard.isTypeValid( this.type )) {
            return html`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.bad_wizard}</h1>
                        <p>${this.t.found_bad_wizard}</p>
                        <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                        <a class="btn tight light" href="/">${this.t.home}</a>
                    </div>
                </div>
            `
        }

        if (!this.wizard.isLoaded()) {
            return
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
        const currentStep = {...this.steps[this.stepIndex]}

        if (currentStep.slug = Steps.joinTraining) {
            return 'container-md'
        }

        return 'container-xsm'
    }

    currentStep() {
        const currentStep = { ...this.steps[this.stepIndex] }

        let tag = ''
        let translations = ''
        switch (currentStep.slug) {
            case Steps.updateName:
            case Steps.updateLocation:
            case Steps.updatePhone:
                tag = literal`complete-profile`
                translations = this.t.complete_profile
                break
            case Steps.contactPreferences:
            case Steps.languagePreferences:
            case Steps.howCanWeServe:
            case Steps.connectingToCoach:
                tag = literal`request-coach`
                translations = this.t.get_a_coach
                break
            case Steps.inviteFriends:
                tag = literal`invite-friends`
                translations = this.t.share
                break
            case Steps.joinTraining:
                tag = literal`join-training`
                translations = this.t.join_training
                break
            case Steps.joinFriendsPlan:
                tag = literal`join-friend-training`
                translations = this.t.join_training
                break
            case Steps.connectToFriend:
                tag = literal`connect-friend`
                translations = this.t.connect_friend
                break
            case Steps.checkinSubmit:
                tag = literal`session-checkin`
                translations = this.t.checkin
                break
            case Steps.planDecision:
            case Steps.howManySessions:
            case Steps.howOften:
            case Steps.startDate:
            case Steps.location:
            case Steps.review:
                tag = literal`make-training`
                translations = this.t.make_training
                break
            default:
                break;
        }

        return staticHtml`
            <${tag}
                class="w-100"
                name=${currentStep.slug}
                module=${currentStep.module}
                variant=${currentStep.slug}
                ?skippable=${currentStep.skippable}
                .t=${translations}
                @done-step=${this._onNext}
                @loadingChange=${this._handleLoading}
                value=${JSON.stringify(currentStep?.value)}
            ></${tag}>
        `
    }

    headerButtons() {

        return html`
            <div class="cluster | inline s-3">
                <button
                    class="close-btn"
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this._onQuit}
                >
                    <span class="icon zume-close"></span>
                </button>
            </div>
        `
    }

    finishButton() {

        return html`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._handleFinish} ?disabled=${this.loading} class="btn tight light ${this.loading ? 'disabled' : ''}">${this.t.finish}</button>
                </div>
            </div>
        `
    }

    stepCounter() {
        const hideCircles = this.steps.length < 2

        return html`
            <div class="cluster">
                ${this.steps.map((step, i) => {
                    const completed = i <= this.stepIndex
                    return html`<div class="step-circle ${hideCircles ? 'hidden' : ''} ${completed ? 'complete' : ''}"></div>`
                })}
            </div>
        `
    }

    footer() {
        if (this.noUrlChange && this.stepIndex > 0) {
            return html`
                <button
                    @click=${this._onBack}
                    class="btn tight light outline fit-content"
                >
                    ${this.t.back}
                </button>
            `

        }
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
    _handleFinish() {
        this._onFinish()
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
            if ( this.type === Wizards.checkin ) {
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

        window.location.href = url.href
    }

    _gotoStep(index, pushState = true) {
        if ( this.steps.length === 0 ) {
            return
        }

        this.stepIndex = this.clampSteps(index)
        this.step = {...this.steps[this.stepIndex] }

        if ( pushState && !this.noUrlChange ) {
            const url = new URL(window.location.href)
            const urlParts = url.pathname.split('/')
            const slug = urlParts[urlParts.length - 1]

            let newUrl = ''
            if ( Object.values(Wizards).includes(slug) ) { // first load of the wizard
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

        if ( Object.values(Wizards).includes(path) ) {
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

    _handleGotoStep(event) {
        const { slug } = event.detail

        const index = this.steps.findIndex((step) => step.slug === slug)
        this._gotoStep(index)
    }

    _handleLoadWizard(event) {
        const { wizard } = event.detail

        if (Object.values(Wizards).includes(wizard)) {
            this.steps = this.wizard.getSteps( wizard )
            this._gotoStep(0)
        } else {
            this._onSkip()
        }
    }

    _handleLoading(event) {
        const { loading } = event.detail

        this.loading = loading
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}

window.customElements.define( 'zume-wizard', Wizard )
