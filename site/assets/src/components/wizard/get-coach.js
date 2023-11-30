import { LitElement, html, css } from 'lit';
import { ZumeWizardSteps } from './wizard-constants';
import { WizardState, WizardStateManager } from './wizard-state-manager';

export class GetCoach extends LitElement {
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
    }

    firstUpdated() {
        this.wizardStateManager = new WizardStateManager(this.module)
    }

    render() {
        return html`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${ this.variant === ZumeWizardSteps.contactPreferences ? html`
                <h2 class="f-1">${this.t.contact_preference_question}</h2>
                <div class="stack">
                    <div>
                        <input type="checkbox" name="contact-preference" id="email" value="email" @change=${this._handleChange}/>
                        <label for="email">${this.t.email}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="text" value="text" @change=${this._handleChange}/>
                        <label for="text">${this.t.text}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="phone" value="phone" @change=${this._handleChange}/>
                        <label for="phone">${this.t.phone}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="whatsapp" value="whatsapp" @change=${this._handleChange}/>
                        <label for="whatsapp">${this.t.whatsapp}</label>
                    </div>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.languagePreferences ? html`
                <h2 class="f-1">${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="language">${this.t.language_preference}</label>
                    <input type="text" name="language-preference" id="language" @change=${this._handleChange}/>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.howCanWeServe ? html`
                <h2 class="f-1">${this.t.how_can_we_serve}</h2>
                <div class="stack">
                    <div>
                        <input type="checkbox" name="contact-preference" id="coaching" value="coaching" @change=${this._handleChange}/>
                        <label for="coaching">${this.t.coaching}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="technical" value="technical" @change=${this._handleChange}/>
                        <label for="technical">${this.t.technical_assistance}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="implementation" value="implementation" @change=${this._handleChange}/>
                        <label for="implementation">${this.t.question_implementation}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="content" value="content" @change=${this._handleChange}/>
                        <label for="content">${this.t.question_content}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="group-started" value="group-started" @change=${this._handleChange}/>
                        <label for="group-started">${this.t.help_with_group}</label>
                    </div>
                </div>
            ` : '' }
            ${ this.variant === ZumeWizardSteps.connectingToCoach ? html`

                <h1>Connecting you to a Coach</h1>
                <div class="stack">
                    <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
                    <p>Successfully connected you. One of our team will contact you in the next 24-48 hours</p>
                </div>
            ` : '' }
            <div class="cluster">
                <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            </div>
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        </form>
        `
    }

    _handleDone(event) {
        if ( event ) {
            event.preventDefault()
        }

        if ( Object.keys(this.state).length === 0 ) {
            console.log(this.state)
            this.errorMessage = this.t.missing_response

            setTimeout(() => {
                this.errorMessage = ''
            }, 3000)

            return
        }

        this.wizardStateManager.add(this.variant, this.state)

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
    }

    clearErrorMessage() {
        this.errorMessage = ''
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('get-coach', GetCoach);
