import { LitElement, html } from 'lit';
import { Modules, Steps, Wizards } from './wizard-constants';
import { WizardStateManager } from './wizard-state-manager';
import { DateTime } from 'luxon';

export class MakeTraining extends LitElement {
    static get properties() {
        return {
            /**
             * Translation strings
             */
            t: { type: Object },
            /**
             * What inputs to display
             */
            variant: { type: String },
            state: { attribute: false },
            state: { type: String, attribute: false },
            selectedDays: { type: Array, attribute: false },
            completedSteps: { type: Array, attribute: false },
            calendarStart: { type: String, attribute: false },
            calendarEnd: { type: String, attribute: false },
            calendarView: { type: String, attribute: false },
            scheduleView: { type: String, attribute: false },
            errorMessage: { type: String, attribute: false },
            message: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
        }
    }

    constructor() {
        super()
        this.variant = ''
        this.t = {}
        this.state = {}
        this.timeNote = ''
        this.errorMessage = ''
        this.message = ''
        this.loading = false
        this.stateManager = new WizardStateManager(Modules.makePlan)
        this.stateManager.clear()
        this.trainingSchedule = []
        this.selectedDays = []
        this.completedSteps = []
        this.calendarStart = DateTime.now().startOf('month').toISODate()
        this.calendarStartMinusOneYear = DateTime.now().minus({ year: 1 }).startOf('month').toISODate()
        this.calendarEnd = DateTime.now().plus({ month: 2 }).endOf('month').toISODate()
        this.calendarEndTwoYears = DateTime.now().plus({ years: 2 }).endOf('month').toISODate()
        this.calendarView = 'all'
        this.scheduleView = 'calendar'
}

    willUpdate(properties) {
        const defaultState = {
            [Steps.howManySessions]: '10',
            [Steps.scheduleDecision]: 'yes',
            [Steps.howOften]: 'weekly',
            [Steps.location]: '',
            [Steps.startDate]: DateTime.now().toISODate(),
        }
        if (properties.has('variant')) {
            this.state = this.stateManager.get(this.variant) || defaultState[this.variant]

            if (this.variant === Steps.howOften || this.variant === Steps.startDate) {
                const scheduleDecision = this.stateManager.get(Steps.scheduleDecision)
                if (this.isIntensive() || scheduleDecision === 'no') {
                    this._sendDoneStepEvent()
                }
            }
            if (this.variant === Steps.review) {
                this._buildSelectedDays()
            }
            if (this.variant === Steps.review && this.isIntensive()) {
                this.scheduleView = 'list'
            }
            /* DEV only */
            if (false && this.variant !== Steps.review) {
                this.variant = Steps.review
                this.stateManager.add(Steps.howManySessions, '10')
                this.stateManager.add(Steps.howOften, 'weekly')
                this.stateManager.add(Steps.startDate, '2024-07-12')
                this._buildSelectedDays()
            }
        }
    }

    _handlePlanDecision(event) {
        const decision = event.target.dataset.decision
        let wizard = ''
        switch (decision) {
            case 'make':
                wizard = Wizards.makeAGroup
                break;
            case 'join':
                wizard = Wizards.joinATraining
                break;
            default:
                break;
        }
        this._sendLoadWizardEvent(wizard)
    }

    _sendLoadWizardEvent(wizard, queryParams = {}) {
        const detail = {
            wizard
        }
        if (Object.keys(queryParams).length > 0) {
            detail.queryParams = queryParams
        }
        this.dispatchEvent(new CustomEvent('wizard:load', { bubbles: true, detail }))
    }

    _handleDone(event) {
        if ( event ) {
            event.preventDefault()
        }

        if (!this.completedSteps.includes(this.variant)) {
            this.completedSteps = [...this.completedSteps, this.variant]
        }
        if (this.variant === Steps.scheduleDecision && this.state === 'no') {
            this.completedSteps = this.completedSteps.filter((step) => step !== Steps.howOften && step !== Steps.startDate)
        }

        this._saveState()

        this._sendDoneStepEvent()
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
    }

    _gotoStep(step) {
        const doneStepEvent = new CustomEvent( 'wizard:goto-step', { bubbles: true, detail: { slug: step } } )
        this.dispatchEvent(doneStepEvent)
    }

    _handleSelection(event) {
        const value = event.target.dataset.value
        this.state = value

        this._saveState()
    }

    _saveState() {
        this.stateManager.add(this.variant, this.state)
    }

    _handleChange(event) {
        if (event.target.name === 'time') {
            this.timeNote = event.target.value
            this.stateManager.add(Steps.timeNote, this.timeNote)
            return
        }

        if (event.target.type === 'text') {
            this.state = event.target.value
        }

        this.stateManager.add(this.variant, this.state)
    }

    _buildSelectedDays() {

        const howManySessions = this.stateManager.get(Steps.howManySessions)
        const howOften = this.stateManager.get(Steps.howOften)
        const startDate = this.stateManager.get(Steps.startDate)

        if (this.selectedDays.length > 0) {
            return
        }

        if (howManySessions && howOften && startDate) {
            let weekInterval = 0
            if (howOften === 'weekly') {
                weekInterval = 1
            }
            if (howOften === 'biweekly') {
                weekInterval = 2
            }
            if (howOften === 'monthly') {
                weekInterval = 4
            }

            const selectedDays = []
            const date = DateTime.fromISO(startDate)
            for (let i = 1; i < Number(howManySessions) + 1; i++) {
                selectedDays.push({
                    date: date.plus({weeks: weekInterval * ( i - 1 )}).toISODate(),
                    id: this.createId(),
                })
            }
            this.selectedDays = selectedDays
            this.calendarStart = DateTime.fromISO(date).startOf('month').toISODate()
            this.calendarEnd = DateTime.fromISO(selectedDays[selectedDays.length - 1].date).endOf('month').toISODate()
            this.calendarView = 'all'
        }
    }
    _buildSet(days) {
        const howManySessions = this.stateManager.get(Steps.howManySessions)
        const startTime = this.stateManager.get(Steps.timeNote)
        const location = this.stateManager.get(Steps.location)

        const trainingSchedule = {
            location_note: location || '',
            time_of_day_note: startTime || '',
        }

        let prefix = ''
        if (howManySessions === '10') {
            prefix = 'set_a_'
        }
        if (howManySessions === '20') {
            prefix = 'set_b_'
        }
        if (howManySessions === '5') {
            prefix = 'set_c_'
        }

        const sortedDays = days.sort(this.sortDays)
        for (let i = 1; i < Number( howManySessions ) + 1; i++) {
            const numberString = i < 10 ? `0${i}` : `${i}`
            let time
            if ( i-1 < sortedDays.length ) {
                time = DateTime.fromISO(sortedDays[i-1].date).toSeconds()
            } else {
                time = ''
            }
            trainingSchedule[prefix + numberString] = time
        }

        return trainingSchedule
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

    _handleCreate() {
        if (this.loading) {
            return
        }
        const howManySessions = this.stateManager.get(Steps.howManySessions)
        const scheduleDecision = this.stateManager.get(Steps.scheduleDecision)
        const name = this.stateManager.get(Steps.name)
        let set_type = ''
        switch (howManySessions) {
            case '10':
                set_type = 'set_a'
                break;
            case '20':
                set_type = 'set_b'
                break;
            case '5':
                set_type = 'set_c'
                break;
            default:
                break;
        }
        if (scheduleDecision === 'yes' && this.selectedDays.length !== Number(howManySessions)) {
            this.errorMessage = this.t.incorrect_number_of_sessions
            setTimeout(() => {
                this.errorMessage = ''
            }, 3000)
            return
        }

        const postData = {
            user_id: jsObject.profile.user_id,
            contact_id: jsObject.profile.contact_id,
            title: name || '',
            set_type,
            set: this._buildSet(this.selectedDays)
        }

        this.loading = true
        makeRequest( 'POST', 'plan', postData, 'zume_system/v1' )
            .then((data) => {
                this._handleFinish(data.join_key)
            })
            .fail((error) => {
                console.log(error)
            })
            .always(() => {
                this.loading = false
            })
    }

    _handleFinish(joinKey) {
        this._sendLoadWizardEvent(Wizards.inviteFriends, { joinKey })
    }

    isIntensive() {
        const howManySessions = this.stateManager.get(Steps.howManySessions)

        return howManySessions === '5'
    }

    toggleView() {
        if (this.scheduleView === 'calendar') {
            this.scheduleView = 'list'
        } else {
            this.scheduleView = 'calendar'
        }
    }

    createId() {
        return sha256(Math.random(0,10000)).slice(0, 6)
    }
    selectStartDate(event) {
        const { date } = event.detail

        this.state = date
        this.stateManager.add(Steps.startDate, this.state)
    }
    clearStartDate(event) {
        this.state = ''
        this.stateManager.remove(this.variant)
    }
    addDate(event) {
        const { date } = event.detail

        const day = {
            date,
            id: this.createId(),
        }

        this.selectedDays = [...this.selectedDays, day]
    }
    removeDate(event) {
        const { id } = event.detail

        console.log(id)

        const index =  this.selectedDays.findIndex((day) => id === day.id)

        if (index > -1) {
            this.selectedDays = [
                ...this.selectedDays.slice(0, index),
                ...this.selectedDays.slice(index + 1)
            ]
        }
    }

    updateCalendarEnd(event) {
        const { newEndDate } = event.detail
        this.calendarEnd = newEndDate
    }

    _clearCalendar() {
        this.selectedDays = []
    }

    render() {
        const howManySessions = Number( this.stateManager.get(Steps.howManySessions) )
        const scheduleDecision = this.stateManager.get(Steps.scheduleDecision)
        let progressText = ''
        let progressColor = ''
        if (this.selectedDays.length < howManySessions) {
            progressText = this.t.x_of_total_selected.replace('%1$s', this.selectedDays.length).replace('%2$s', howManySessions)
            progressColor = 'var(--z-brand-light)'
        }
        if ( this.selectedDays.length === howManySessions ) {
            progressText = this.t.all_selected.replace('%s', howManySessions)
            progressColor = 'var(--z-success)'
        }
        if ( this.selectedDays.length > howManySessions ) {
            progressText = this.t.too_many_selected.replace('%s', this.selectedDays.length - howManySessions)
            progressColor = 'var(--z-error-main)'
        }

        return html`
            <div class="stack-1 position-relative">
                ${this.variant === Steps.planDecision ? html`
                    <div class="stack">
                        <span class="z-icon-start-group brand-light f-7"></span>
                        <h2>${this.t.join_or_start_a_training}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight" data-decision="make" @click=${this._handlePlanDecision}>${this.t.start_a_training}</button>
                            <button class="btn tight" data-decision="join" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                            <button class="btn tight outline" data-decision="skip" @click=${this._handlePlanDecision}>${this.t.skip_for_now}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.howManySessions ? html`
                    <div class="stack">
                        <span class="z-icon-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_which_session}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight green ${this.state === '20' ? '' : 'outline'}" data-value="20" @click=${this._handleSelection}>${this.t.hour_1_session_20}</button>
                            <button class="btn tight green ${this.state === '10' ? '' : 'outline'}" data-value="10" @click=${this._handleSelection}>${this.t.hour_2_session_10}</button>
                            <button class="btn tight green ${this.state === '5' ? '' : 'outline'}" data-value="5" @click=${this._handleSelection}>${this.t.hour_4_session_5}</button>
                            <button class="btn tight mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.scheduleDecision ? html`
                    <div class="stack">
                        <span class="z-icon-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_schedule_training}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight green ${this.state === 'yes' ? '' : 'outline'}" data-value="yes" @click=${this._handleSelection}>${this.t.yes}</button>
                            <button class="btn tight green ${this.state === 'no' ? '' : 'outline'}" data-value="no" @click=${this._handleSelection}>${this.t.no}</button>
                            <button class="btn tight mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.howOften ? html`
                    <div class="stack">
                        <span class="z-icon-time brand-light f-7"></span>
                        <h2>${this.t.question_how_often}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight green ${this.state === 'weekly' ? '' : 'outline'}" data-value="weekly" @click=${this._handleSelection}>${this.t.weekly}</button>
                            <button class="btn tight green ${this.state === 'biweekly' ? '' : 'outline'}" data-value="biweekly" @click=${this._handleSelection}>${this.t.biweekly}</button>
                            <button class="btn tight green ${this.state === 'other' ? '' : 'outline'}" data-value="other" @click=${this._handleSelection}>${this.t.other}</button>
                            <button class="btn tight mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.startDate ? html`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_when_will_you_start}</h2>
                        <calendar-select
                            style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                            showToday
                            showClearButton
                            showTodayButton
                            .translations=${{
                                clear: this.t.clear,
                                today: this.t.today,
                            }}
                            .selectedDays=${typeof this.state === 'string' && this.state ? [{ date: this.state}] : []}
                            @day-added=${this.selectStartDate}
                            @clear=${this.clearStartDate}
                        ></calendar-select>
                        <input type="text" name="time" placeholder=${this.t.time} @change=${this._handleChange} value=${this.timeNote} />
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.location ? html`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_where_will_you_meet}</h2>
                        <p>${this.t.question_where_will_you_meet_help_text}</p>
                        <input type="text" name="location" placeholder=${this.t.location} @change=${this._handleChange} value=${typeof this.state === 'string' ? this.state : ''} />
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.name ? html`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_what_is_the_groups_name}</h2>
                        <input type="text" name="name" placeholder=${this.t.group_name} @change=${this._handleChange} value=${typeof this.state === 'string' ? this.state : ''} />
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.review ? html`
                    <div class="stack">
                        <h2><span class="z-icon-overview brand-light"></span> ${this.t.review_training}</h2>

                        ${
                            scheduleDecision === 'yes'
                                ? html`
                                    <div class="cluster">
                                        <button
                                            class="btn outline red small tight fit-content"
                                            @click=${this._clearCalendar}
                                        >
                                            ${this.t.clear_calendar}
                                        </button>
                                        <button class="btn outline small tight ms-auto" @click=${this.toggleView}>${this.scheduleView === 'calendar' ? 'list' : 'calendar'}</button>
                                    </div>
                                ` : ''
                        }
                        ${
                            this.scheduleView === 'calendar' && scheduleDecision === 'yes'
                                ? html`
                                    <calendar-select
                                        style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                                        startDate=${this.calendarStart}
                                        endDate=${this.calendarEnd}
                                        .selectedDays=${this.selectedDays.sort(this.sortDays)}
                                        view=${this.calendarView}
                                        showToday
                                        .translations=${{
                                            clear: this.t.clear,
                                            today: this.t.today,
                                        }}
                                        @day-added=${this.addDate}
                                        @day-removed=${this.removeDate}
                                        @calendar-extended=${this.updateCalendarEnd}
                                    ></calendar-select>
                                ` : ''
                        }
                        ${
                            this.scheduleView === 'list' && scheduleDecision === 'yes'
                                ? html`
                                    <calendar-list
                                        .t=${this.t}
                                        .selectedDays=${this.selectedDays}
                                        @day-added=${this.addDate}
                                        @day-removed=${this.removeDate}
                                    ></calendar-list>
                                ` : ''
                        }
                        <div class="make-training__save-area stack" ?data-absolute=${scheduleDecision === 'no'}>
                            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
                            <div class="d-flex align-items-center gap-0 bg-white py-0">
                                ${
                                    scheduleDecision === 'yes' ? html`
                                        <div class="grow-1">
                                            <span>${progressText}</span>
                                            <progress-slider
                                                class="grow-1 mt--3"
                                                percentage=${this.selectedDays.length / howManySessions * 100}
                                                style="--primary-color: ${progressColor}"
                                            ></progress-slider>
                                        </div>
                                    ` : html`<span class="grow-1"></span>`
                                }
                                <button
                                    class="btn tight ms-auto"
                                    @click=${this._handleCreate}
                                >
                                    ${this.t.create}
                                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}
                ${this.variant !== Steps.planDecision ? html`
                    <review-steps
                        .t=${this.t}
                        name=${this.stateManager.get(Steps.name)}
                        howManySessions=${this.stateManager.get(Steps.howManySessions)}
                        scheduleDecision=${this.stateManager.get(Steps.scheduleDecision)}
                        howOften=${this.stateManager.get(Steps.howOften)}
                        time=${this.stateManager.get(Steps.timeNote)}
                        date=${this.stateManager.get(Steps.startDate)}
                        whatLocation=${this.stateManager.get(Steps.location)}
                        .display=${this.completedSteps}
                    ></review-steps>
                ` : ''}
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('make-training', MakeTraining);
