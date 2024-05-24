import { LitElement, html, css } from 'lit';

export class PublicTrainings extends LitElement {
    static get properties() {
        return {
            /**
             * Translation strings
             */
            t: { type: Object },
            /**
             * Join link
             *
             * If provided, will be used as the href of the link to join that is in the table.
             * If not provided, this component will just emit an event with details of the training selected
             */
            joinLink: { type: String },
            loading: { attribute: false },
            posts: { attribute: false },
        }
    }

    constructor() {
        super()

        this.loading = true
        this.plans = []

        this.getTrainings()

        this.renderRow = this.renderRow.bind(this)
    }

    getTrainings() {
        makeRequest( 'POST', 'public_plans', {}, 'zume_system/v1' )
            .then((plans) => {
                this.plans = plans
            })
            .catch((error) => {
                console.log(error)
            })
            .always(() => {
                this.loading = false
            })
    }

    render() {
        if ( this.loading ) {
            return html`<span class="loading-spinner active"></span>`
        }

        if (this.plans.length === 0) {
            return html`
                <p>${this.t.no_plans}</p>
            `
        }

        return html`
            <table>
                <thead>
                    <tr>
                        <td>${this.t.name}</td>
                        <td>${this.t.next_date}</td>
                        <td>${this.t.start_time}</td>
                        <td>${this.t.timezone}</td>
                        <td>${this.t.language}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    ${this.plans.map(this.renderRow)}
               </tbody>
            </table>
        `;
    }

    renderRow ({
        join_key,
        language_note,
        post_title,
        time_of_day_note,
        timezone_note,
        ...fields
    }) {
        const set = fields['set_a_01'] ? 'a' : 'b'
        const plan_length = set === 'a' ? 10 : 20
        const plan_prefix = `set_${set}_`

        const now = Date.now() / 1000

        let latestPlanDate = ''
        for ( let i = 1; i < plan_length + 1; i++ ) {
            const sessionIndex = i < 10 ? `0${i}` : `${i}`;
            const sessionDate = fields[plan_prefix + sessionIndex];
            latestPlanDate = sessionDate['timestamp'];
            if ( now < sessionDate['timestamp'] ) {
                break;
            }
        }

        const formattedDate = moment(latestPlanDate * 1000).format('MMM Do \'YY')

        return html`
            <tr>
                <td data-label="${this.t.name}">${post_title}</td>
                <td data-label="${this.t.next_date}">${formattedDate}</td>
                <td data-label="${this.t.start_time}">${time_of_day_note}</td>
                <td data-label="${this.t.timezone}">${timezone_note}</td>
                <td data-label="${this.t.language}">${language_note}</td>
                <td><button class="btn" data-code=${join_key} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `
    }

    _handleJoinTraining(event) {
        console.log(event)

        const code = event.target.dataset.code

        const chosenTrainingEvent = new CustomEvent( 'chosen-training', { bubbles: true, detail: { code } } )
        this.dispatchEvent(chosenTrainingEvent)
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('public-trainings', PublicTrainings);
