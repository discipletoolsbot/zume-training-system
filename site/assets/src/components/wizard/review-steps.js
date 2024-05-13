import { LitElement, html } from 'lit';
import { Steps } from './wizard-constants';

export class ReviewSteps extends LitElement {
    static get properties() {
        return {
            t: { type: Object },
            howOften: { type: String },
            howManySessions: { type: String },
            whatLocation: { type: String },
            date: { type: String },
            time: { type: String },
        };
    }

    module;
    steps;

    constructor() {
        super()
        this.t = {}
        this.howOften = ''
        this.howManySessions = ''
        this.whatLocation = ''
        this.date = ''
        this.time = ''
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
   }

    handleChange(event) {
        const slug = event.target.dataset.step

        this.dispatchEvent(new CustomEvent( 'wizard:goto-step', { bubbles: true, detail: { slug } } ))
        window.scrollTo(0, 0)
    }

    hasData() {
        return this.howManySessions
            || this.howOften
            || this.date
            || this.time
            || this.location
    }

    render() {
        if ( !this.hasData() ) {
            return
        }

        return html`
            <div class="stack mw-50ch mx-auto text-start mt-2">
                <hr />
                <h5 class="gray-700 text-left f-medium mt-2">${this.t.summary}</h5>
                ${this.howManySessions !== '' ? html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-20 justify-content-between gap--3">
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
                ` : ''}
                ${this.howOften !== '' ? html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-20 justify-content-between gap--3">
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
                ` : ''}
                ${this.date !== '' || this.time !== '' ? html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-20 justify-content-between gap--3">
                            <span>${(new Date(`${this.date} ${this.time}`)).toLocaleString(navigator.language || 'en-US', {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.startDate}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                ` : ''}
                ${this.whatLocation !== '' ? html`
                    <div class="stack--1">
                        <div class="switcher switcher-width-20 justify-content-between gap--3">
                            <span>${this.whatLocation}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline light tight"
                                    data-step=${Steps.location}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('review-steps', ReviewSteps);
