import { LitElement, html } from 'lit';
import { Steps } from './wizard-constants';

export class ReviewSteps extends LitElement {
    static get properties() {
        return {
            t: { type: Object },
            name: { type: String },
            howOften: { type: String },
            howManySessions: { type: String },
            scheduleDecision: { type: String },
            whatLocation: { type: String },
            date: { type: String },
            time: { type: String },
            display: { type: Array },
        };
    }

    module;
    steps;

    constructor() {
        super()
        this.t = {}
        this.display = []
    }

    connectedCallback() {
        super.connectedCallback();

        this.howOfterDict = {
            weekly: this.t.weekly,
            biweekly: this.t.biweekly,
            monthly: this.t.monthly,
            other: this.t.other,
        }
        this.howManyDict = {
            '20': this.t.hour_1_session_20,
            '10': this.t.hour_2_session_10,
            '5': this.t.hour_4_session_5,
        }
        this.scheduleDecisionDict = {
            'yes': this.t.yes,
            'no': this.t.no,
        }
   }

    handleChange(event) {
        const slug = event.target.dataset.step

        this.dispatchEvent(new CustomEvent( 'wizard:goto-step', { bubbles: true, detail: { slug } } ))
        window.scrollTo(0, 0)
    }

    shouldDisplay() {
        return this.display.length > 0
    }

    renderSummary(step) {
        switch (step) {
            case Steps.name:
                return html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.name === ''
                                ? html`<span></span>`
                                : html`<span>${this.name}</span>`
                            }
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.name}
                                    @click=${this.handleChange}
                                >
                                    ${
                                        this.name !== ''
                                            ? this.t.change
                                            : this.t.set_group_name
                                    }
                                </button>
                            </span>
                        </div>
                    </div>
                `
            case Steps.location:
                return html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.whatLocation === ''
                                ? html`<span></span>`
                                : html`<span>${this.whatLocation}</span>`
                            }
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.location}
                                    @click=${this.handleChange}
                                >
                                    ${
                                        this.whatLocation !== ''
                                            ? this.t.change
                                            : this.t.set_location
                                    }
                                </button>
                            </span>
                        </div>
                    </div>
                `
            case Steps.howManySessions:
                return html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howManyDict[this.howManySessions] || this.howManySessions}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.howManySessions}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `
            case Steps.scheduleDecision:
                return html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.scheduleDecisionDict[this.scheduleDecision] || this.scheduleDecision}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.scheduleDecision}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `
            case Steps.howOften:
                return html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howOfterDict[this.howOften] || this.howOften}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.howOften}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `
            case Steps.startDate:
                return html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.date === '' && this.time === ''
                                ? html`<span></span>`
                                : html`
                                    <span>${(new Date(`${this.date} ${this.time === 'not-set' ? '' : this.time}`)).toLocaleString(navigator.language || 'en-US', {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</span>`
                            }
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.startDate}
                                    @click=${this.handleChange}
                                >
                                    ${
                                        this.date !== '' || this.time !== ''
                                            ? this.t.change
                                            : this.t.set_start_date
                                    }
                                </button>
                            </span>
                        </div>
                    </div>
                `
            default:
                return ''
        }
    }

    render() {
        if ( !this.shouldDisplay() ) {
            return
        }

        return html`
            <div class="stack mw-50ch mx-auto text-start mt-2">
                <hr />
                <h5 class="gray-700 text-left f-medium mt-2">${this.t.summary}</h5>
                ${this.display.map((step) => this.renderSummary(step))}
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('review-steps', ReviewSteps);
