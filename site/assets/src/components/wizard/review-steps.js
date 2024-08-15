import { LitElement, html } from 'lit';
import { Steps } from './wizard-constants';
import { zumeAttachObservers } from '../../js/zumeAttachObservers';

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
            summaryOpen: { type: Boolean },
        };
    }

    module;
    steps;

    constructor() {
        super()
        this.t = {}
        this.display = []
        this.summaryOpen = false
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

    updated() {
        zumeAttachObservers(this.renderRoot, 'review-steps')
    }

    handleChange(event) {
        const slug = event.target.dataset.step

        this.dispatchEvent(new CustomEvent( 'wizard:goto-step', { bubbles: true, detail: { slug } } ))
        window.scrollTo(0, 0)
    }

    shouldDisplay() {
        return this.display.length > 0
    }

    toggleSummary() {
        this.summaryOpen = !this.summaryOpen
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
                                    class="btn small no-outline tight"
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
                                    class="btn small no-outline tight"
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
                                    class="btn small no-outline tight"
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
                                    class="btn small no-outline tight"
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
                                    class="btn small no-outline tight"
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
                            ${this.date === ''
                                ? html`<span></span>`
                                : html`
                                    <span>${(new Date(this.date)).toLocaleString(navigator.language || 'en-US', {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}</span>`
                            }
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${Steps.startDate}
                                    @click=${this.handleChange}
                                >
                                    ${
                                        this.date !== ''
                                            ? this.t.change
                                            : this.t.set_start_date
                                    }
                                </button>
                            </span>
                        </div>
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.time === ''
                                ? html`<span></span>`
                                : html`
                                    <span>${this.time}</span>`
                            }
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${Steps.startDate}
                                    @click=${this.handleChange}
                                >
                                    ${
                                        this.time !== ''
                                            ? this.t.change
                                            : this.t.set_start_time
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
                <button
                    class="h5 gray-700 text-left f-medium mt-2 repel"
                    @click=${this.toggleSummary}
                >
                    ${this.t.summary}
                    <img
                        class="chevron | svg w-1rem h-1rem ${this.groupMembersOpen ? 'rotate-180' : ''}"
                        src=${jsObject.images_url +
                        '/chevron.svg'}
                    />
                </button>
                <div class="zume-collapse" ?data-expand=${this.summaryOpen}>
                    ${this.display.map((step) => this.renderSummary(step))}
                </div>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('review-steps', ReviewSteps);
