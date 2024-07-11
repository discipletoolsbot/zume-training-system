import { LitElement, html } from 'lit';

export class SessionCheckin extends LitElement {

    static get properties() {
        return {
            /**
             * Translation strings
             */
            t: { type: Object },

            code: { attribute: false },
            message: { attribute: false },
            errorMessage: { attribute: false },
            loading: { attribute: false },
        };
    }

    constructor() {
        super()

        this.code = ''
        this.errorMessage = ''
        this.loading = false
    }

    firstUpdated() {
        this.loading = true
        this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
        this.message = this.t.please_wait
        /* We need the plan id */
        const url = new URL( location.href )
        if ( !url.searchParams.has('code') ) {
            this.message = ""
            this.setErrorMessage(this.t.broken_link)
            this.loading = false
            this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
            this.dispatchEvent(new CustomEvent('wizard:finish', { bubbles: true }))
            return
        }

        const code = url.searchParams.get('code')
        this.code = code

        makeRequest( 'POST', 'checkin', { code: code }, 'zume_system/v1' )
            .then( ( data ) => {
                this._sendDoneStepEvent()
            })
            .fail( ({ responseJSON: error }) => {
                console.log(error)
                this.message = ''
                if ( error.code === 'bad_checkin_code' ) {
                    this.setErrorMessage(this.t.broken_link)
                } else {
                    this.setErrorMessage(this.t.error)
                }
                this.dispatchEvent(new CustomEvent('wizard:finish', { bubbles: true }))
            })
            .always(() => {
                this.loading = false
                this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
            })
    }

    _sendDoneStepEvent() {
        this.dispatchEvent(new CustomEvent( 'done-step', { bubbles: true } ))
    }

    setErrorMessage( message ) {
        this.errorMessage = message
    }

    render() {
        return html`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('session-checkin', SessionCheckin);
