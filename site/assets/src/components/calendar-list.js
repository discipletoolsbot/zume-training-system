import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DateTime } from 'luxon';

export class CalendarList extends LitElement {
    static get properties() {
        return {
            t: { type: Object },
            selectedDays: { type: Array },
            date: { type: String, attribute: false },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderDate = this.renderDate.bind(this)
    }

    onChange(event) {
        this.date = event.target.value
    }

    addDate() {
        if (!this.date) {
            return
        }
        this.dispatchEvent(new CustomEvent('day-added', { detail: { date: this.date } }))
    }

    removeDate(id) {
        this.dispatchEvent(new CustomEvent('day-removed', { detail: { id } }))
    }

    renderDate({date, id}, i) {
        return html`
            <li>
                <div class="d-flex align-items-center justify-content-between">
                    <span class="mx-0">${DateTime.fromISO(date).toFormat('DDDD')}</span>
                    <button class="close-btn" @click=${() => this.removeDate(id)}>
                        <span class="icon zume-close"></span>
                    </button>
                </div>
            </li>
        `
    }

    render() {
        return html`
            <div class="stack">
                <ol class="stack">
                ${
                    this.selectedDays.length === 0 ? html`
                        <span>${this.t.no_days_selected}</span>
                    ` : html`
                        ${repeat(this.selectedDays.sort(this.sortDays), (day) => day.id, this.renderDate)}
                    `
                }
                </ol>

                <div class="d-flex align-items-center gap-0">
                    <input class="input fit-content" type="date" @change=${this.onChange} value=${this.date} />
                    <button class="btn light tight" @click=${this.addDate}>
                        ${this.t.add}
                    </button>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('calendar-list', CalendarList);
