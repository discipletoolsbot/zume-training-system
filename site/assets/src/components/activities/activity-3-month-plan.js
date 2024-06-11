import { LitElement, html } from 'lit';

export class Activity3MonthPlan extends LitElement {
    static get properties() {
        return {
            questions: { type: Array },
            translations: { type: Object },
            contact_id: { type: String },
            user_id: { type: String },
            showCancel: { type: Boolean },
            answers: { type: Array, attribue: false },
            error: { type: Boolean, attribute: false },
            loading: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()
        this.questions = []
        this.answers = []
        this.translations = []
        this.contact_id = ''
        this.user_id = ''
        this.error = false
        this.loading = false
    }

    handleInputChange(event) {
        const i = event.target.dataset.i
        this.answers[i] = event.target.value
        this.update()
    }
    handleCancel() {
        this.clearAnswers()
        this.dispatchEvent(new CustomEvent('3-month-plan-cancelled', { bubbles: true }))
    }
    handleSave() {
        this.loading = true
        const requests = []
        if (this.answers.length === 0) {
            this.loading = false
            return
        }
        this.answers.forEach((answer, i) => {
            if ( answer ) {

                const question = this.questions[i]

                var date = new Date(); // Now
                date.setDate(date.getDate() + 30);

                /**
                 * TODO: refactor the POST commitment API to take a list of commitments
                 * then we can safely fetch all the commitments once the single API request has completed
                 */
                const request = makeRequest('POST', 'commitment', {
                    "user_id": this.user_id,
                    "post_id": this.contact_id,
                    "meta_key": "tasks",
                    "note": `${this.translations.question}: ${question} ${this.translations.answer}: ${answer}`,
                    "question": question,
                    "answer": answer,
                    "date": date,
                    "category": "post_training_plan"
                }, 'zume_system/v1' )
                requests.push(request.promise())
            }
        })
        return Promise.all(requests)
            .then(() => {
                this.loading = false
                this.clearAnswers()
                this.dispatchEvent(new CustomEvent('3-month-plan-saved', { bubbles: true }))
            })
            .catch((error) => {
                console.error(error)
                this.error = true
                this.loading = false
            })
    }
    clearAnswers() {
        this.renderRoot.querySelectorAll('.post-training-plan').forEach((element) => {
            element.value = ''
        })
    }

    render() {
        const disabled = this.loading || this.answers.length === 0
        return html`
            <div id="pieces-content" class="stack">
                ${ this.questions.map( (question, i) => {
                    const questionNumber = `question-${i}`
                    return html`
                        <div class="stack--3">
                            <label for=${questionNumber}>${question}</label>
                            <textarea
                                id=${questionNumber}
                                data-i=${i}
                                type="text"
                                class="input post-training-plan"
                                rows="1"
                                @input=${this.handleInputChange}
                            ></textarea>
                        </div>
                `
                })}
                <div class="cluster justify-flex-end">
                    ${
                        this.showCancel ? html`
                            <button
                                class="btn light outline uppercase"
                                @click=${this.handleCancel}
                            >
                                ${this.translations.cancel}
                            </button>
                            ` : ''
                    }
                    <button
                        ?disabled=${disabled}
                        aria-disabled=${disabled ? 'true' : 'false'}
                        class="btn light uppercase"
                        @click=${this.handleSave}
                    >
                        ${this.translations.save}
                        <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                    </button>

                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('activity-3-month-plan', Activity3MonthPlan);
