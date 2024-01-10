import { LitElement, html } from 'lit';
import { ZumeWizardSteps } from './wizard-constants';
import { WizardStateManager } from './wizard-state-manager';

export class RequestCoach extends LitElement {
    static get properties() {
        return {
            /**
             * The step name
             */
            name: { type: String },
            /**
             * The module name that this step is part of
             */
            module: { type: String },
            /**
             * Is this step skippable
             */
            skippable: { type: Boolean },
            /**
             * Translation strings
             */
            t: { type: Object },
            /**
             * What inputs to display
             */
            variant: { type: String },
            state: { attribute: false },
            errorMessage: { attribute: false },
            message: { attribute: false },
            loading: { attribute: false },
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.skippable = false
        this.variant = ''
        this.t = {}
        this.state = {}
        this.errorMessage = ''
        this.message = ''
        this.loading = false
        this.contactPreferences = [
            'email',
            'text',
            'phone',
            'whatsapp',
            'signal',
            'telegram',
            'messenger',
        ]
    }

    firstUpdated() {
        this.message = this.t.connect_success

        const data = this.stateManager.getAll()

        if ( this.variant === ZumeWizardSteps.connectingToCoach ) {
            this.loading = true
            this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
            const onCoachRequested = (( data ) => {
                if ( data === false ) {
                    this.message = this.t.connect_fail
                    this.setErrorMessage(this.t.error_connecting)
                }

                if (
                    data.coach_request &&
                    data.coach_request.errors &&
                    Object.keys(data.coach_request.errors).length !== 0
                ) {
                    const errorKeys = Object.keys(data.coach_request.errors)

                    if (errorKeys[0] === 'already_has_coach') {
                        this.message = this.t.already_coached
                        this.setErrorMessage(this.t.error_connecting)
                    }
                }

                this._handleFinish()
            }).bind(this)
            const onFail = (() => {
                this.message = this.t.connect_fail
                this.setErrorMessage(this.t.error_connecting)

                this._handleFinish()
            }).bind(this)
            makeRequest('POST', 'get_a_coach', { data }, 'zume_system/v1/' )
                .done(onCoachRequested)
                .fail(onFail)
                .always(() => {
                    this.loading = false
                    this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
                })
        }
    }

    setErrorMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    render() {
        if ( !this.stateManager ) {
            this.stateManager = new WizardStateManager(this.module)

            this.state = this.stateManager.get(this.variant) || {}

            if ( this.variant === ZumeWizardSteps.languagePreferences && !this.state.value ) {
                this.state.value = zumeProfile.profile.preferred_language || 'en'
                this.stateManager.add( this.variant, this.state )
            }
            if ( this.variant === ZumeWizardSteps.contactPreferences && Object.keys(this.state).length === 0 ) {
                this.state = Object.fromEntries(zumeProfile.profile.contact_preference.map((pref) => ([ pref, 'true' ])))
            }
        }

        return html`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${ this.variant === ZumeWizardSteps.contactPreferences ? html`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map((preference) => html`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${preference} value=${preference} @change=${this._handleChange} ?checked=${!!this.state[preference]} />
                            <label for=${preference}>${this.t[preference]}</label>
                        </div>
                    `)}
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.languagePreferences ? html`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${ Object.values(jsObject.languages).map((language) => html`
                            <option value=${language['code']} ?selected=${language['code'] === this.state.value} >
                                ${language['nativeName']} - ${language['enDisplayName']}
                            </option>
                        `) }

                    </select>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.howCanWeServe ? html`
                <h2>${this.t.how_can_we_serve}</h2>
                <div class="stack center | container-sm align-items-start text-start">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="coaching" value="coaching-request" @change=${this._handleChange} ?checked=${!!this.state.coaching} />
                        <label for="coaching">${this.t.coaching}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="technical" value="technical-assistance" @change=${this._handleChange} ?checked=${!!this.state.technical} />
                        <label for="technical">${this.t.technical_assistance}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="implementation" value="question-about-implementation" @change=${this._handleChange} ?checked=${!!this.state.implementation} />
                        <label for="implementation">${this.t.question_implementation}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="content" value="question-about-content" @change=${this._handleChange} ?checked=${!!this.state.content} />
                        <label for="content">${this.t.question_content}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="group-started" value="help-with-group" @change=${this._handleChange} ?checked=${!!this.state['group-started']} />
                        <label for="group-started">${this.t.help_with_group}</label>
                    </div>
                </div>
            ` : '' }
            ${ this.variant === ZumeWizardSteps.connectingToCoach ? html`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            ` : '' }
            ${ this.variant !== ZumeWizardSteps.connectingToCoach
                ? html`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `
                : ''}
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        </form>
        `
    }

    _handleDone(event) {
        if ( event ) {
            event.preventDefault()
        }

        if ( Object.keys(this.state).length === 0 ) {
            this.setErrorMessage(this.t.missing_response)

            return
        }

        this._sendDoneStepEvent()
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
    }

    _handleFinish() {
        setTimeout(() => {
            this._sendDoneStepEvent()
        }, 3000);
    }

    _handleChange(event) {
        if ( event.target.type === 'checkbox' ) {
            this.state[event.target.value] = event.target.checked
        }
        if ( event.target.type === 'text' ) {
            this.state.value = event.target.value
        }
        if ( event.target.type === 'select-one' ) {
            this.state.value = event.target.value
        }

        this.stateManager.add(this.variant, this.state)
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('request-coach', RequestCoach);
