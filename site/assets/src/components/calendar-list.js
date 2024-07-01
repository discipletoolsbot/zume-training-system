import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DateTime } from 'luxon';

export class CalendarList extends LitElement {
    static get properties() {
        return {
            t: { type: Object },
            selectedDays: { type: Array },
            date: { type: String, attribute: false },
            datePickerOpen: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()

        this.datePickerOpen = false
        this.openDatePicker = this.openDatePicker.bind(this)
    }

    firstUpdated() {
        jQuery(this.renderRoot).foundation()
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderDate = this.renderDate.bind(this)
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
                        <span class="icon z-icon-close"></span>
                    </button>
                </div>
            </li>
        `
    }

    sortDays(a, b) {
        if ( a.date === b.date ) {
            return 0
        }
        if ( a.date < b.date ) {
            return -1
        }
        return 1
    }

    openDatePicker(event) {
        event.preventDefault()
        this.openDatePicker = true
    }
    setDate(event) {
        const { date } = event.detail
        this.date = date
    }
    clearDate() {
        this.date = ''
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

                <div class="cluster align-items-center gap-0 mx-auto">
                    <div class="mx-auto">${this.date ? DateTime.fromISO(this.date).toFormat('DDDD') : ''}</div>
                    <div class="cluster mx-auto">
                        <button
                            data-toggle="date-picker"
                            class="icon-btn brand-light f-3"
                            @click=${this.openDatePicker}
                        ><span class="icon z-icon-start-date"></span></button>
                        <button class="btn tight" @click=${this.addDate}>
                            ${this.t.add}
                        </button>
                    </div>
                </div>
                <div
                    class="dropdown-pane zume-date-picker ${this.datePickerOpen ? 'is-open' : ''}"
                    id="date-picker"
                    data-dropdown
                    data-close-on-click="true"
                    data-position="bottom"
                    data-alignment="center"
                >
                    <calendar-select
                        style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                        showToday
                        showTodayButton
                        showClearButton
                        .translations=${{
                            clear: this.t.clear,
                            today: this.t.today,
                        }}
                        .selectedDays=${this.date ? [ { date: this.date } ] : []}
                        @day-added=${this.setDate}
                        @clear=${this.clearDate}
                    ></calendar-select>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('calendar-list', CalendarList);
