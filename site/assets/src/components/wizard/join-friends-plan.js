import { LitElement, html } from 'lit';

export class JoinFriendsPlan extends LitElement {

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

            code: { attribute: false },
            messages: { attribute: false },
            errorMessage: { attribute: false },
            loading: { attribute: false },
        };
    }

    constructor() {
        super()

        this.code = ''
        this.message = 'Please wait while we connect you.'
        this.errorMessage = ''
        this.loading = false
    }

    firstUpdated() {
        this.loading = true
        /* We need the plan id */
        const url = new URL( location.href )
        if ( !url.searchParams.has('code') ) {
            this.message = ""
            this.setErrorMessage('The training link is broken. Please try again.')
            this._sendDoneStepEvent()
            this.loading = false
            return
        }

        const code = url.searchParams.get('code')
        this.code = code

        makeRequest( 'POST', 'connect/plan', { code: code }, 'zume_system/v1' )
            .then( ( data ) => {
                console.log(data)

                this.message = `Successfully connected with training ${data.name}`

                this._sendDoneStepEvent()
            })
            .fail( ({ responseJSON: error }) => {
                console.log(error)
                this.message = ''
                if ( error.code === 'bad_plan_code' ) {
                    this.setErrorMessage('The training link is broken. Please try again.')
                } else {
                    this.setErrorMessage('Something went wrong while connecting with the training')
                }

                this._sendDoneStepEvent()
            })
            .always(() => {
                this.loading = false
            })
    }

    _sendDoneStepEvent() {
        setTimeout(() => {
            const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
            this.dispatchEvent(doneStepEvent)
        }, 2000);
    }

    setErrorMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    render() {
        return html`
            <h1>Joining training</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-friends-plan', JoinFriendsPlan);
