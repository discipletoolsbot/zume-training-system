import { LitElement, html, css } from 'lit';
import { range } from 'lit/directives/range.js'
import { map } from 'lit/directives/map.js'
import { DateTime } from 'luxon'

export class CalendarSelect extends LitElement {
    static styles = [
        css`
          :host {
            display: block;
            container-type: inline-size;
            container-name: calendar;
          }
          .calendar-wrapper {
            --cp-color: var(--primary-color, #489bfa);
            --cp-color-darker: var(--primary-darker, #387cc9);
            --cp-hover-color: var(--hover-color, #4676fa1a);
            --cp-grid-min-size: var(--grid-min-size, 190px);

            display: grid;
            grid-gap: 1rem;
            grid-auto-rows: 1fr;
          }
          @supports (width: min(250px, 100%)) {
            .calendar-wrapper {
              grid-template-columns: repeat(auto-fit, minmax(min(var(--cp-grid-min-size), 100%), 1fr));
            }
          }
          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 14.2%);
            row-gap: 4px;
            justify-items: center;
          }
          .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1;
            max-width: 40px;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            border-color: transparent;
            transition: background-color 50ms linear;
            width: 100%;
          }
          .day.cell:hover {
            background-color: var(--cp-hover-color);
            cursor: pointer;
          }
          .day.cell.disabled  {
            color:lightgrey;
            cursor: default;
          }
          .day.cell.disabled:hover {
            background-color: transparent;
          }
          .week-day {
            font-weight: 600;
            font-size:clamp(0.75em, 0.65rem + 2cqi, 1em);
          }
          .selected-time {
            color: black;
            border-color: var(--cp-color);
            background-color: var(--cp-hover-color);
          }
          .selected-day {
            color: white;
            background-color: var(--cp-color);
          }
          .day.cell.selected-day:hover {
            color: white;
            background-color: var(--cp-color-darker);
          }
          .month-title {
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            font-weight: 600;
            grid-column: 2 / 7;
            margin-block: 0;
          }
          .month-title.full-width {
            grid-column: 1 / 8;
          }
          .month-next {
            padding: 0.2rem 0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .month-next svg {
            width: 1.5rem;
          }
          button {
            padding: 0.25rem 0.5rem;
            color: rgb(254, 254, 254);
            font-size: 1rem;
            border-radius: 5px;
            border: 1px solid transparent;
            font-weight: normal;
            padding: 0.85rem 1rem;
            cursor: pointer;
            background-color: var(--cp-color);
            line-height: 1;
            transition: all 50ms linear;
          }
          button:not([disabled]):hover {
            background-color: transparent;
            border-color: var(--cp-color);
            color: var(--cp-color);
          }
          button[disabled] {
            opacity: 0.25;
            cursor: default;
          }
          .add-month-button {
            display: flex;
            align-items: center;
            justify-content: center;
            fill: var(--cp-color);
            background-color: var(--cp-hover-color);
            margin-inline: 10%;
            margin-block: auto;
            aspect-ratio: 3 / 4;
            border-radius: 10%;
            transition: all 50ms linear;
            cursor: pointer;
          }
          .add-month-button:hover svg,
          .add-month-button:active svg,
          .add-month-button:focus svg {
            transform: scale(1.2);
          }
          .add-month-button svg {
            transition: transform 100ms linear;
            width: 30%;
          }
        `,
    ]

    static get properties() {
        return {
            startDate: { type: String },
            endDate: { type: String },
            selectedDays: { type: Array },
            view: { type: String },
            monthToShow: { attribute: false },
        }
    }

    constructor() {
        super();
        this.monthToShow = null;
        this.startDate = ''
        this.endDate = ''
        this.selectedDays = []
        this.view = 'slider'
    }

    nextView(month){
        this.shadowRoot.querySelectorAll('.selected-time').forEach(element => element.classList.remove('selected-time'))
        this.monthToShow = month
    }

    daySelected(event, day){
        this.dispatchEvent(new CustomEvent('day-selected', { detail: day }));
        this.shadowRoot.querySelectorAll('.selected-time').forEach(element => element.classList.remove('selected-time'))
        event.target.classList.add('selected-time');
    }

    getDaysOfTheWeekInitials(localeName = 'en-US', weekday = 'long') {
        const now = new Date()
        const dayInMilliseconds = 86400000
        const format = new Intl.DateTimeFormat(localeName, { weekday }).format
        return [...Array(7).keys()]
            .map((day) => format(new Date().getTime() - ( now.getDay() - day  ) * dayInMilliseconds  ))
    }

    buildCalendarDays(localeName = 'en-US', monthDate){
        const monthStart = monthDate.startOf('month').startOf('day');
        const monthDays = []
        const format = new Intl.DateTimeFormat(localeName, { day: 'numeric' }).format
        for ( let i = 0; i < monthDate.daysInMonth; i++ ){
            const dayDate = monthStart.plus({ days: i })
            const nextDay = dayDate.plus({ days: 1 })
            const disabled = (this.endDate && dayDate > DateTime.fromISO(this.endDate))
                || nextDay <= DateTime.fromISO(this.startDate)
            const day = {
                key: dayDate.toISODate(),
                formatted: format(dayDate.toMillis()),
                disabled,
            }
            monthDays.push(day)
        }
        return monthDays
    }

    addMonth() {
        const newEndDate = DateTime.fromISO(this.endDate).plus({months: 1}).endOf('month').toISODate()
        this.endDate = newEndDate
    }

    renderCalendar(monthDate) {
        const weekDayNames = this.getDaysOfTheWeekInitials(navigator.language, 'narrow')
        const dayOfWeekNumber = monthDate.startOf('month').weekday
        const monthDays =  this.buildCalendarDays(navigator.language, monthDate)
        return html`
            ${
                weekDayNames.map( name => html`
                    <div class="cell week-day">
                        ${name}
                    </div>
                `
            )}
            ${
                map( range( dayOfWeekNumber%7 ), i => html`
                    <div class="cell"></div>
                `
            )}
            ${
                monthDays.map(day => html`
                    <div
                        class="cell day ${day.disabled ? 'disabled':''} ${this.selectedDays.includes(day.key) ? 'selected-day':''}"
                        data-day=${day.key}
                        @click=${event => !day.disabled && this.daySelected(event, day.key)}
                    >
                        ${day.formatted}
                    </div>
                `
            )}
        `
    }

    renderSlider() {
        const now = DateTime.now({ locale: navigator.language })
        const monthDate = this.monthToShow || DateTime.max(now, DateTime.fromISO(this.startDate))
        const monthStart = monthDate.startOf('month')


        const previousMonth = monthDate.minus({ months: 1 })
        const nextMonth = monthStart.plus({ months: 1 })

        return html`

            <div class="calendar-wrapper">
                <div class="calendar">
                    <button
                        class="month-next"
                        ?disabled=${monthStart < now}
                        @click=${() => this.nextView(previousMonth)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M15 6L8 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h3 class="month-title">
                        ${monthDate.toFormat('LLLL y')}
                    </h3>
                    <button
                        class="month-next"
                        ?disabled=${nextMonth > DateTime.fromISO(this.endDate)}
                        @click=${() => this.nextView(nextMonth)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M10 6L17 12L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ${this.renderCalendar(monthDate)}
                </div>
            </div>
        `
    }

    render() {
        if (this.view === 'all') {
            const monthDate = DateTime.fromISO(this.startDate)
            const monthStart = monthDate.startOf('month')

            let i = 0
            while (true) {
                let currentMonth = monthStart.plus({ months: i })
                if (currentMonth < DateTime.fromISO(this.endDate)) {
                    i = i + 1
                } else {
                    break
                }
            }

            return html`
                <div class="calendar-wrapper">
                    ${
                        map( range( i ), (index) => {
                            const currentMonth = monthStart.plus({ months: index })
                            return html`
                                <div class="calendar">
                                    <h3 class="month-title full-width">
                                        ${currentMonth.toFormat('LLLL y')}
                                    </h3>
                                    ${
                                        this.renderCalendar(currentMonth)
                                    }
                                </div>
                            `
                        })
                    }
                    ${
                        this.view !== 'slider' ? html`
                            <div class="add-month-button" role="button" @click=${this.addMonth}>
                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" color="currentColor" width="40" height="40" viewBox="0 0 40 40">
                                    <path d="M32.104,18.262h-10.365V7.896c0-.96-.777-1.738-1.738-1.738s-1.738.778-1.738,1.738v10.366H7.896c-.961,0-1.738.778-1.738,1.738s.777,1.738,1.738,1.738h10.367v10.367c0,.96.777,1.738,1.738,1.738s1.738-.778,1.738-1.738v-10.367h10.365c.961,0,1.738-.778,1.738-1.738s-.777-1.738-1.738-1.738Z" stroke-width="0"/>
                                </svg>
                            </div>
                        ` : ''
                    }
                </div>
            `
        } else {
            return this.renderSlider()
        }
    }
}
customElements.define('calendar-select', CalendarSelect);
