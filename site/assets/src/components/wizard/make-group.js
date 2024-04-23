import { LitElement, html } from 'lit';
import { ZumeWizardSteps } from './wizard-constants';

export class MakePlan extends LitElement {
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
    }

    setErrorMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    render() {
        return html`
            ${this.variant === ZumeWizardSteps.howManySessions ? html`
                <h2>${jsObject.translations.question_which_session}</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.hour_1_session_20}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.hour_2_session_10}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.whatTimeOfDay ? html`
                <h2>${jsObject.translations.question_which_time}</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.morning}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.afternoon}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.evening}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.howOften ? html`
                <h2>${jsObject.translations.question_how_often}</h2>
                <div class="stack">
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.daily}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.weekly}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.bimonthly}</button>
                    <button class="btn" @click=${this._handleDone}>${jsObject.translations.monthly}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.startDate ? html`
                <h2>${jsObject.translations.question_when_will_you_start}</h2>
                <input type="date">
                <button class="btn" @click=${this._handleDone}>${jsObject.translations.done}</button>
            ` : ''}

        `;
    }

    _handleDone(event) {
        if ( event ) {
            event.preventDefault()
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

    createRenderRoot() {
        return this
    }
}
customElements.define('make-group', MakePlan);
