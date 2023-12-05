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
            messages: { attribute: false },
            errorMessage: { attribute: false },
            loading: { attribute: false },
        };
    }

    constructor() {
        super()

        this.code = ''
        this.messages = ['Please wait while we connect you.']
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
            this.setErorrMessage('You are not logged in')
            this.loading = false
            return
        }

        makeRequest( 'POST', 'connect/public-plan', { code: code }, 'zume_system/v1' )
            .then( ( data ) => {
                console.log(data)

                this.messages = [`Successfully joined training ${data.name}`]

                return makeRequest( 'POST', 'connect_to_coach', { coach_id: data.coach_id }, 'zume_system/v1' )
            })
            .then( ( data ) => {
                console.log( 'connecting to coach data ', data )

                this.messages.push(`Successfully connected with coach ${data.coach}`)

                if (coach_request.errors && Object.keys(coach_request.errors).includes('already_has_coach')) {
                    this.setErorrMessage('You already have a coach')
                }

            } )
            .fail( (error) => {
                this.setErorrMessage('Something went wrong while joining the plan')
                console.log(error)
            })
            .always(() => {
                this.loading = false
            })
    }

    setErorrMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    render() {
        return html`
            <h1>Joining Plan</h1>
            ${this.messages.map((message) => {
                return html`<p>${message}</p>`
            })}
            <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-training', JoinTraining);
