import { LitElement, html, css } from 'lit';
import { range } from 'lit/directives/range.js'
import { map } from 'lit/directives/map.js'
import { DateTime, Info } from 'luxon'

export class CalendarSelect extends LitElement {
    static styles = [
        css`
          :host {
            display: block;
            container-type: inline-size;
            container-name: calendar;
          }
          button {
            background-color: transparent;
            color: inherit;
            font-size: inherit;
            font-family: inherit
          }
          button:hover {
            color: inherit
          }
          .calendar-wrapper {
            --cp-color: var(--primary-color, #489bfa);
            --cp-color-darker: var(--primary-darker, #387cc9);
            --cp-hover-color: var(--hover-color, #4676fa1a);
            --cp-grid-min-size: var(--grid-min-size, 190px);
            font-size: min(6cqw, 18px);
          }
          .calendar-footer {
            margin-left: 5%;
            margin-right: 5%;
          }
          .repel {
            display: flex;
            justify-content: space-between;
          }
          .grid {
            display: grid;
            grid-gap: 1rem;
            grid-auto-rows: 1fr;
          }
          @supports (width: min(250px, 100%)) {
            .grid {
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
          .highlighted-day {
            background-color: var(--cp-hover-color);
          }
          .selected-day {
            color: white;
            background-color: var(--cp-color);
          }
          .today {
            border-color: black;
          }
          .day.cell.selected-day:hover {
            color: white;
            background-color: var(--cp-color-darker);
          }
          .month-title {
            display: flex;
            justify-content: space-between;
            font-size: 1.1em;
            font-weight: 600;
            grid-column: 2 / 7;
            margin-top: 0;
            margin-bottom: 0;
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
            width: 1.5em;
          }
          [dir="rtl"] .month-next svg {
            transform: rotate(180deg);
          }
          .button {
            padding: 0.25em 0.5em;
            color: rgb(254, 254, 254);
            font-size: 1em;
            border-radius: 5px;
            border: 1px solid transparent;
            font-weight: normal;
            cursor: pointer;
            background-color: var(--cp-color);
            line-height: 1;
            transition: all 50ms linear;
          }
          .button:not([disabled]):hover {
            background-color: transparent;
            border-color: var(--cp-color);
            color: var(--cp-color);
          }
          .button[disabled] {
            opacity: 0.25;
            cursor: default;
          }
          .button.small {
            padding: 0.4rem 0.5rem;
          }
          .add-month-button {
            display: flex;
            align-items: center;
            justify-content: center;
            fill: var(--cp-color);
            background-color: var(--cp-hover-color);
            margin-left: 10%;
            margin-right: 10%;
            margin-top: auto;
            margin-bottom: auto;
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
            highlightedDays: { type: Array },
            view: { type: String },
            translations: { type: Object },
            showToday: { type: Boolean },
            showTodayButton: { type: Boolean },
            showClearButton: { type: Boolean },
            monthToShow: { attribute: false },
        }
    }

    constructor() {
        super();
        this.startDate = ''
        this.endDate = ''
        this.selectedDays = []
        this.highlightedDays = []
        this.showToday = false
        this.showTodayButton = false
        this.showClearButton = false
        this.today = DateTime.now().toISODate()
        this.view = 'slider'
        this.translations = {
            'clear': 'Clear',
            'today': 'Today',
        }
        const htmlElement = document.querySelector('html')
        this.isRtl = htmlElement.getAttribute('dir') === 'rtl'

    }
    firstUpdated() {
        super.firstUpdated()
        this.monthToShow = DateTime.now();
    }

    willUpdate(properties) {
        if (properties.has('selectedDays') && this.selectedDays.length > 0) {
            const firstSelectedDay = this.selectedDays[0]
            this.monthToShow = DateTime.fromFormat(`${firstSelectedDay.date}`, 'y-LL-dd')
        }
    }

    nextView(month){
        this.shadowRoot.querySelectorAll('.selected-time').forEach(element => element.classList.remove('selected-time'))
        this.monthToShow = month
    }

    handleSelectDay(event, date){
        const target = event.target
        this.selectDay(date, target)
    }
    selectDay(date, target) {
        const days = this.selectedDays.filter((day) => day.date === date)
        if (days.length === 0) {
            this.dispatchEvent(new CustomEvent('day-added', { detail: { date } }));
        } else {
            days.forEach(({ id }) => {
                this.dispatchEvent(new CustomEvent('day-removed', { detail: { id } }));
            })
        }
        this.shadowRoot.querySelectorAll('.selected-time').forEach(element => element.classList.remove('selected-time'))
        if (target) {
            target.classList.add('selected-time');
        }
    }

    getDaysOfTheWeekInitials(localeName = 'en-US', weekday = 'long') {
        const now = new Date()
        const dayInMilliseconds = 86400000
        const format = (millis) => DateTime.fromMillis(millis).toLocaleString({ weekday })
        return [...Array(7).keys()]
            .map((day) => format(new Date().getTime() - ( now.getDay() - day  ) * dayInMilliseconds  ))
    }

    buildCalendarDays(localeName = 'en-US', monthDate){
        const monthStart = monthDate.startOf('month').startOf('day');
        const monthDays = []
        const format = (millis) => DateTime.fromMillis(millis).toLocaleString({ day: 'numeric' })
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
        this.dispatchEvent(new CustomEvent( 'calendar-extended', { detail: { newEndDate } } ))
        this.endDate = newEndDate
    }

    isHighlighted(date) {
        const days = this.highlightedDays.find((day) => day.date === date)
        return !!days
    }

    isSelected(date) {
        const days = this.selectedDays.find((day) => day.date === date)
        return !!days
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
                    <button
                        class="cell day ${day.disabled ? 'disabled':''} ${this.isHighlighted(day.key) ? 'highlighted-day' : ''} ${this.isSelected(day.key) ? 'selected-day'  : ''} ${this.showToday && day.key === this.today ? 'today' : ''}"
                        data-day=${day.key}
                        @click=${event => !day.disabled && this.handleSelectDay(event, day.key)}
                    >
                        ${day.formatted}
                    </button>
                `
            )}
        `
    }

    clearCalendar() {
        this.dispatchEvent(new CustomEvent('clear'))
        this.shadowRoot.querySelectorAll('.selected-time').forEach((element) => {
            element.classList.remove('selected-time')
        })
    }
    selectToday() {
        this.monthToShow = DateTime.now({ locale: navigator.language})
        const nowDate = this.monthToShow.toISODate()
        const target = this.shadowRoot.querySelector(`.day[data-day="${nowDate}"]`)
        this.selectDay(nowDate, target)
    }

    renderSlider() {
        const now = DateTime.now({ locale: navigator.language })
        const monthDate = this.monthToShow || DateTime.fromISO(this.startDate)
        const monthStart = monthDate.startOf('month')


        const previousMonth = monthDate.minus({ months: 1 })
        const nextMonth = monthStart.plus({ months: 1 })

        return html`

            <div class="calendar-wrapper" dir=${this.isRtl ? 'rtl' : 'ltr'}>
                <div class="calendar">
                    <button
                        class="button month-next"
                        ?disabled=${this.startDate ? monthStart <= DateTime.fromISO(this.startDate).startOf('month') : false}
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
                        class="button month-next"
                        ?disabled=${this.endDate ? nextMonth > DateTime.fromISO(this.endDate) : false}
                        @click=${() => this.nextView(nextMonth)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M10 6L17 12L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ${this.renderCalendar(monthDate)}
                </div>
                ${ this.showClearButton || this.showTodayButton ? html`
                        <div class="calendar-footer repel">
                            ${
                                this.showClearButton ? html`
                                    <button
                                        class="button small"
                                        @click=${() => this.clearCalendar()}
                                    >
                                        ${this.translations.clear}
                                    </button>
                                ` : ''
                            }
                            ${
                                this.showTodayButton ? html`
                                    <button
                                        class="button small"
                                        @click=${() => this.selectToday()}
                                    >
                                        ${this.translations.today}
                                    </button>
                                ` : ''
                            }
                        </div>
                    ` : ''
                }

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
                <div class="calendar-wrapper grid" dir=${this.isRtl ? 'rtl' : 'ltr'}>
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
