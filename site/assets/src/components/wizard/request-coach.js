import { LitElement, html } from 'lit';
import { Steps } from './wizard-constants';
import { WizardStateManager } from './wizard-state-manager';
import { zumeRequest } from '../../js/scripts';

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
            requestSent: { attribute: false },
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
        this.requestSent = false
        this.contactPreferences = [
            'email',
            'text',
            'phone',
            'whatsapp',
            'signal',
            'telegram',
            'messenger',
        ]
        this.stateManager = new WizardStateManager(this.module)
        this.stateManager.clear()
    }

    updated() {
        this.message = this.t.connect_success

        const data = this.stateManager.getAll()

        if ( this.variant === Steps.connectingToCoach && this.requestSent === false ) {
            this.loading = true
            this.requestSent = true
            this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
            zumeRequest.post('get_a_coach', { data } )
                .then(( data ) => {
                    if ( data === false ) {
                        this.message = this.t.connect_fail
                        this.setErrorMessage(this.t.error_connecting)
                    }
                })
                .catch((error) => {
                    if (error.message === 'already_has_coach') {
                        this.message = ''
                        this.setErrorMessage(this.t.already_coached)
                        return
                    }

                    this.message = this.t.connect_fail
                    this.setErrorMessage(this.t.error_connecting)
                })
                .finally(() => {
                    this.loading = false
                    this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
                    this.dispatchEvent(new CustomEvent('wizard:finish', { bubbles: true }))
                })
        }
    }

    willUpdate(properties) {
        if (properties.has('variant')) {

            this.state = this.stateManager.get(this.variant) || {}

            if ( this.variant === Steps.languagePreferences && !this.state.value ) {
                this.state.value = jsObject.profile.preferred_language || 'en'
                this.stateManager.add( this.variant, this.state )
            }
        }
    }

    setErrorMessage( message ) {
        this.errorMessage = message
    }

    render() {
        return html`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${ this.variant === Steps.contactPreferences ? html`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map((preference) => html`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${'prefer_' + preference} value=${preference} @change=${this._handleChange} ?checked=${!!this.state[preference]} />
                            <label for=${'prefer_' + preference}>${this.t[preference]}</label>
                        </div>
                    `)}
                </div>
            ` : ''}

            ${ this.variant === Steps.languagePreferences ? html`
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

            ${ this.variant === Steps.howCanWeServe ? html`
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
            ${ this.variant === Steps.connectingToCoach ? html`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            ` : '' }
            ${ this.variant !== Steps.connectingToCoach
                ? html`
                    <div class="mx-auto">
                        <button type="submit" class="btn tight light" ?disabled=${this.loading}>${this.t.next} <span class="loading-spinner ${this.loading ? 'active' : ''}"></span></button>
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

        if ( Object.keys(this.state).length === 0 || Object.values(this.state).every((item) => !item)) {
            this.setErrorMessage(this.t.missing_response)
            return
        } else {
            this.setErrorMessage('')
        }

        this._sendDoneStepEvent()
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
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
