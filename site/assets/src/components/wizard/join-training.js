import { LitElement, html } from 'lit';

export class JoinTraining extends LitElement {

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
            message: { attribute: false },
            errorMessage: { attribute: false },
            loading: { attribute: false },
        };
    }

    constructor() {
        super()

        this.code = ''
        this.message = ''
        this.errorMessage = ''
        this.loading = false
    }

    firstUpdated() {
        this.loading = true
        /* We need the plan id */
        const url = new URL( location.href )
        if ( !url.searchParams.has('code') ) {
            this.message = 'Please input a code'
            this.loading = false
            return
        }

        const code = url.searchParams.get('code')
        this.code = code

        const user_id = zumeProfile.profile?.user_id

        if ( !user_id ) {
            this.errorMessage = 'You are not logged in'
            this.loading = false
            return
        }

        makeRequest( 'POST', 'connect/public-plan', { code: code }, 'zume_system/v1' )
            .then( ( data ) => {
                this.message = `Successfully joined training . You are being coached by ${data.coach}`

                console.log(data)
            })
            .fail( (error) => {
                console.log(error.responseJSON)
                if ( error.responseJSON.code === 'already_has_coach' ) {
                    this.message = `Successfully joined training ${error.code}`
                    this.errorMessage = 'You already have a coach'
                }
                console.log(error)
            })
            .always(() => {
                this.loading = false
            })
    }

    hideErorrMessage() {
        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    render() {
        return html`
            <h1>Joining Plan</h1>
            ${this.loading === true ? html`
                <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
            ` : html`
                <p>${this.message}</p>
                <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
            `}

        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-training', JoinTraining);
