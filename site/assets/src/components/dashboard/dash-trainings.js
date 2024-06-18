import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';
import { Wizards } from '../wizard/wizard-constants';
import { RouteNames } from './routes';
import { zumeRequest } from '../../js/zumeRequest';
import { DateTime } from 'luxon';
import { zumeAttachObservers } from '../../js/zumeAttachObservers';

export class DashTrainings extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            code: { type: String },
            loading: { type: Boolean, attribute: false },
            error: { type: String, attribute: false },
            training: { type: Object, attribute: false },
            sessions: { type: Array, attribute: false },
            sessionToEdit: { type: Object, attribute: false },
            openDetailStates: { type: Object, attribute: false },
            filterStatus: { type: String, attribute: false },
            isEditingTitle: { type: Boolean, attribute: false },
            isSavingTitle: { type: Boolean, attribute: false },
            isSavingSession: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.loading = false
        this.isEditingTitle = false
        this.error = ''
        this.route = DashBoard.getRoute(RouteNames.myTraining)
        this.sessionToEdit = {}
        this.openDetailStates = {}

        this.renderListItem = this.renderListItem.bind(this)
    }

    connectedCallback() {
        super.connectedCallback();

        if ( this.code !== 'teaser' ) {
            this.getTraining()
        }
    }

    willUpdate(properties) {
        if (properties.has('code')) {
            if ( this.code !== 'teaser' ) {
                this.getTraining()
            }
        }
    }

    firstUpdated() {
        super.firstUpdated()
    }

    updated() {
        jQuery(document).foundation();
        zumeAttachObservers()
    }

    getTraining() {
        this.loading = true
        return makeRequest( 'GET', `plan/${this.code}`, {}, 'zume_system/v1' )
            .then((result) => {
                if ( result.error_code ) {
                    throw new Error( result.error_code )
                }
                this.training = result
            })
            .then(() => {
                this.refreshSessions()
                this.groupMembers = this.getGroupMembers()
            })
            .fail((error) => {
                this.error = error.message
            })
            .always(() => {
                this.loading = false
            })
    }
    refreshSessions(completedSessions) {
        if (completedSessions) {
            this.training.completed_sessions = completedSessions
        }
        this.sessions = this.getSessions()
        this.currentSession = this.getCurrentSession()
    }
    getSessions() {
        const trainingType = this.getTrainingType()
        const numberOfSessions = this.getNumberOfSessions()

        const sessions = []

        for (let i = 1; i < numberOfSessions + 1; i++) {
            const digit = i < 10 ? `0${i}` : `${i}`
            const id = trainingType + '_' + digit
            const time = this.training[id]

            sessions.push({
                id,
                name: jsObject.translations.session_x.replace('%d', i),
                datetime: time ? Number( time.timestamp ) * 1000 : 0,
                completed: this.training.completed_sessions.includes(id),
            })
        }

        return sessions
    }
    getGroupMembers() {
        if (!this.training.participants || !Array.isArray(this.training.participants)) {
            return []
        }

        const groupMembers = []

        this.training.participants.forEach((groupMember) => {
            groupMembers.push({
                id: groupMember.ID,
                name: groupMember.post_title,
            })
        })

        return groupMembers
    }
    getTrainingType() {
        return this.training.set_type.key
    }
    getSessionNumber(id) {
        const type = this.getTrainingType() + '_'

        const number = id.slice(type.length)

        return number
    }
    getSessionUrl(id) {
        const type = this.getTrainingType()
        const sessionNumber = this.getSessionNumber(id)

        let indexUrl = ''
        if (type === 'set_a') {
            indexUrl = jsObject.urls.launch_ten_session_course
        }
        if (type === 'set_b') {
            indexUrl = jsObject.urls.launch_twenty_session_course
        }
        if (type === 'set_c') {
            indexUrl = jsObject.urls.launch_intensive_session_course
        }

        const url = new URL(indexUrl)

        url.searchParams.set('session', sessionNumber)

        return url.href
    }
    getNumberOfSessions() {
        const set_type = this.training.set_type.key
        switch (set_type) {
            case 'set_a':
                return 10
            case 'set_b':
                return 20
            case 'set_c':
                return 5
            default:
                break;
        }
    }
    getSlideKey(id) {
        const idParts = id.split('_')
        if (idParts.length !== 3) {
            return ''
        }
        switch (idParts[1]) {
            case 'a':
                return `s1_${Number(idParts[2])}_1`
            case 'b':
                return `s2_${Number(idParts[2])}_1`
            case 'c':
                return `s3_${Number(idParts[2])}_1`
        }
    }
    getCurrentSession() {
        for (let i = 0; i < this.sessions.length; i++) {
            const session = this.sessions[i];

            if ( session.completed ) {
                continue
            }

            return session.id
        }

        return ''
    }

    createTraining() {
        this.dispatchEvent(new CustomEvent( 'open-wizard', { bubbles: true, detail: { type: Wizards.makeAGroup } } ))
    }
    inviteFriends() {
        this.dispatchEvent(new CustomEvent( 'open-wizard', { bubbles: true, detail: { type: Wizards.inviteFriends, params: {
            joinKey: this.code,
        } } } ))
    }

    startSession(id, event) {
        event.stopImmediatePropagation()
        const url = this.getSessionUrl(id)

        location.href = url
    }
    editSession(id, event) {
        this.stopImmediatePropagation(event)
        const sessionToEdit = this.sessions.find((session) => session.id === id)

        const date = DateTime.fromMillis(sessionToEdit.datetime)
        sessionToEdit.date = date.toISODate()
        sessionToEdit.time = date.toFormat('HH:mm')

        this.sessionToEdit = sessionToEdit

        document.querySelector('#session-date-picker').value = sessionToEdit.date
        document.querySelector('#session-time-picker').value = sessionToEdit.time

        this.openEditSessionModal()
    }
    saveSession() {
        if (this.isSavingSession) {
            return
        }
        this.isSavingSession = true
        const date = document.querySelector('#session-date-picker').value
        const time = document.querySelector('#session-time-picker').value
        const sessionTime = DateTime.fromFormat(`${date} ${time}`, 'y-LL-dd HH:mm')
        zumeRequest.post( 'plan/edit-session', {
            key: this.training.join_key,
            session_id: this.sessionToEdit.id,
            session_time: sessionTime.toSeconds(),
        } )
            .then((res) => {
                this.training = {
                    ...this.training,
                    [this.sessionToEdit.id]: {
                        timestamp: sessionTime.toSeconds(),
                        formatted: sessionTime.toISODate(),
                    },
                }
                this.refreshSessions()

                this.closeEditSessionModal()
            })
            .finally(() => {
                this.isSavingSession = false
            })
    }
    cancelEditingSession() {
        this.sessionToEdit = {}
        this.closeEditSessionModal()
    }
    openEditSessionModal() {
        const modal = document.querySelector('#edit-session-modal')
        jQuery(modal).foundation('open')
    }
    closeEditSessionModal() {
        const modal = document.querySelector('#edit-session-modal')
        jQuery(modal).foundation('close')
    }

    editTitle() {
        this.isEditingTitle = true
    }
    cancelEditingTitle() {
        this.isEditingTitle = false
    }
    inputSaveTitle(event) {
        if (event.code === 'Enter') {
            this.saveTitle()
        }
    }
    saveTitle() {
        if (this.isSavingTitle) {
            return
        }
        this.isSavingTitle = true
        const title = document.querySelector('#training-title-input').value
        zumeRequest.put(`plan/${this.training.join_key}`, { title })
            .then((result) => {
                this.training.title = title
                this.dispatchEvent(new CustomEvent('training:changed', { bubbles: true }))
            })
            .finally(() => {
                this.isEditingTitle = false
                this.isSavingTitle = false
            })
    }

    markSessionCompleted(id, event) {
        this.stopImmediatePropagation(event)
        makeRequest( 'POST', 'plan/complete-session', { key: this.training.join_key, session_id: id }, 'zume_system/v1' )
            .then((result) => {
                this.refreshSessions(result)
            })
        /* Update the local store to reflect this change */
    }

    isGroupLeader() {
        if (this.training && this.training.assigned_to && Number( this.training.assigned_to.id ) === jsObject.profile.user_id) {
            return true
        }
        return false
    }
    hasMultipleTrainingGroups() {
        return jsObject.training_groups && Object.keys(jsObject.training_groups).length > 1
    }

    toggleDetails(id) {
        const open = this.openDetailStates[id]

        if (open) {
            this.openDetailStates = {
                ...this.openDetailStates,
                [id]: false,
            }
        } else {
            this.openDetailStates = {
                ...this.openDetailStates,
                [id]: true,
            }
        }
    }
    toggleKebabMenu(event) {
        event.stopImmediatePropagation()
        const id = event.currentTarget.dataset.toggle
        jQuery(`#${id}`).foundation('toggle')
    }
    stopImmediatePropagation(event) {
        event.stopImmediatePropagation()
    }

    renderListItem(session) {
        const { id, name, datetime, completed } = session

        const numberOfSessions = this.getNumberOfSessions()
        const slideKey = this.getSlideKey(id)
        const trainingItems = zumeTrainingPieces[numberOfSessions][slideKey]?.pieces ?? []

        return html`
            <li class="list__item" data-no-flex @click=${() => this.toggleDetails(id)}>
                <div class="switcher | switcher-width-20 gapy0">
                    <div class="list__primary">
                        ${
                            this.currentSession === id ? html`
                                <button class="icon-btn" @click=${(event) => this.startSession(id, event)} aria-label=${jsObject.translations.start_session}>
                                    <span class="icon z-icon-play brand-light"></span>
                                </button>
                            ` : html `
                                <span class="icon z-icon-check-mark success ${completed ? '' : 'invisible'} p--2"></span>
                            `
                        }
                                <span class="f-medium">${name}</span>
                    </div>

                    <div class="list__secondary" data-align-start>
                        <div class="d-flex justify-content-center align-items-center gap--2">
                            <span>${datetime > 0 ? moment(datetime).format("MMM Do YY") : jsObject.translations.not_scheduled}</span>
                            <button class="icon-btn" data-toggle="kebab-menu-${id}" @click=${this.toggleKebabMenu}>
                                <span class="icon z-icon-kebab brand-light"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="list__tertiary collapse" ?data-open=${this.openDetailStates[id]}>
                    <ul class="pt-0 ps-2" role="list" data-brand-light>
                        ${
                            trainingItems.map((item) => html`
                                <li>
                                    <a
                                        @click=${this.stopImmediatePropagation}
                                        href=${[ jsObject.site_url, jsObject.language, item.slug ].join('/')}
                                    >
                                        ${item.title}
                                    </a>
                                </li>
                            `)
                        }
                    </ul>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        ${
                            this.isGroupLeader() ? html`
                                <li><button class="menu-btn" @click=${(event) => this.editSession(id, event)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit_time}</button></li>
                                <li><button class="menu-btn" @click=${(event) => this.markSessionCompleted(id, event)}><span class="icon z-icon-pencil"></span>${jsObject.translations.mark_completed}</button></li>
                            ` : ''
                        }
                        <li><button class="menu-btn" @click=${(event) => this.startSession(id, event)}><span class="icon z-icon-play"></span>${jsObject.translations.start_session}</button></li>
                    </ul>
                </div>
            </li>

        `
    }

    renderMemberItem(member) {
        const { name } = member
        return html`
            <li>
                ${name}
            </li>
        `
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        ${
                            this.hasMultipleTrainingGroups() ? html`
                                    ${
                                        this.isEditingTitle ? html`
                                            <div class="switcher switcher-width-20 gap--5">
                                                <div class="position-relative">
                                                    <input
                                                        class="input grow-1"
                                                        id="training-title-input"
                                                        type="text"
                                                        value=${this.training.title || ''}
                                                        @keydown=${this.inputSaveTitle}
                                                    />
                                                    <div class="absolute ${this.isRtl ? 'left' : 'right'} top bottom d-flex align-items-center mx-0">
                                                        <span class="loading-spinner ${this.isSavingTitle ? 'active' : ''}"></span>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center gap--1 grow-0">
                                                    <button
                                                        class="btn tight grow-0 f--1"
                                                        @click=${this.saveTitle}
                                                        ?disabled=${this.isSavingTitle}
                                                        aria-disabled=${this.isSavingTitle ? 'true' : 'false'}
                                                    >
                                                        ${jsObject.translations.save}
                                                    </button>
                                                    <button
                                                        class="btn outline grow-0 tight f--1"
                                                        @click=${this.cancelEditingTitle}
                                                        ?disabled=${this.isSavingTitle}
                                                    >
                                                        ${jsObject.translations.cancel}
                                                    </button>
                                                </div>
                                            </div>
                                        ` : html`
                                            <div class="d-flex align-items-center gap--5">
                                                <h1 class="h3">${this.training?.title ?? ''}</h1>
                                                <button
                                                    class="icon-btn f-0 brand-light"
                                                    aria-label=${jsObject.translations.edit}
                                                    @click=${this.editTitle}
                                                >
                                                    <span class="icon z-icon-pencil"></span>
                                                </button>
                                            </div>
                                        `
                                    }
                                </div>
                            ` : html`
                                <h1 class="h3">${this.route.translation}</h1>
                            `
                        }
                    </div>
                    ${
                        this.isEditingTitle ? '' : html`
                            <button
                                class="icon-btn f-2 brand-light"
                                aria-label=${jsObject.translations.create_training_group}
                                @click=${this.createTraining}
                            >
                                <span class="icon z-icon-plus"></span>
                            </button>
                        `
                    }
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main content">
                    ${this.loading ? html`<div class="p-1"><span class="loading-spinner active"></span></div>` : '' }
                    ${!this.loading && this.error ? html`
                        <div class="p-1">
                            <h3 class="f-1 bold uppercase">${jsObject.translations.error}</h3>
                            ${
                                this.error === 'bad-plan-code' ? html`
                                    <p>${jsObject.translations.bad_code}</p>
                                    <p>${jsObject.translations.join_key}: ${this.code}</p>
                                ` : ''
                            }
                            ${
                                this.error === 'not-authorized' ? html`
                                    <p>${jsObject.translations.not_authorized}</p>
                                ` : ''
                            }
                        </div>
                        ` : ''
                    }
                    ${
                        this.showTeaser && !this.loading && !this.error
                        ? html`
                            <div class="p-1">
                              <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon z-icon-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.my_training_locked}</h3>
                                    <p>${jsObject.translations.plan_a_training_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.createTraining}>
                                    ${jsObject.translations.unlock}
                                  </button>
                                </div>
                              </div>
                            </div>
                        `
                        : html`
                            <ul class="list">
                                ${
                                    !this.loading && this.sessions && this.sessions.length > 0
                                    ? repeat(this.sessions, (session) => session.id, this.renderListItem)
                                    : ''
                                }
                            </ul>
                        `
                    }
                </div>
                <div class="dashboard__secondary stack">
                    ${this.loading && !this.error ? html`<span class="loading-spinner active"></span>` : '' }
                    ${!this.loading && !this.error && this.code !== 'teaser' ? html`
                                <div class="card | group-members | grow-0">
                                    <button class="f-0 f-medium d-flex align-items-center gap--2 black">
                                        <span class="icon z-icon-group brand-light"></span> ${jsObject.translations.group_members} (${this.groupMembers.length})
                                    </button>
                                    <div class="collapse" data-state="open">
                                        <!-- The functionality of the .collapse class needs to be refactored from dash-progress.js toggleDetails function to be re-used here -->
                                        ${!this.loading && this.groupMembers && this.groupMembers.length > 0
                                            ? html`
                                                <ol class="ps-1">
                                                    ${repeat(this.groupMembers, (member) => member.id, this.renderMemberItem)}
                                                </ol>
                                            `
                                            : ''
                                        }
                                    </div>
                                    <button
                                        @click=${this.inviteFriends}
                                        class="btn brand tight mt--2"
                                    >
                                        ${jsObject.translations.invite_friends}
                                    </button>
                                </div>
                            ` : ''
                    }
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div class="reveal small" id="edit-session-modal" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button">
                        <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <div class="d-flex gap-0 flex-wrap justify-content-center">
                        <h2>${jsObject.translations.edit}:</h2>
                        <h3 class="h2 brand-light">${this.sessionToEdit?.name}</h3>
                    </div>
                    <div class="cluster justify-content-center gapy-0">
                        <input
                            id="session-date-picker"
                            type="date"
                            name="date"
                            class="fit-content m0"
                            onclick="this.showPicker()"
                        >
                        <input
                            id="session-time-picker"
                            type="time"
                            name="time"
                            class="fit-content m0"
                            min="00:00"
                            max="23:55"
                            step="300"
                            onclick="this.showPicker()"
                        >
                    </div>
                    <div class="d-flex align-items-center justify-content-center gap--1">
                        <button
                            class="btn tight"
                            @click=${this.saveSession}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession ? 'true' : 'false'}
                        >
                            ${jsObject.translations.save}
                            <span class="loading-spinner ${this.isSavingSession ? 'active' : ''}"></span>
                        </button>
                        <button
                            class="btn outline tight"
                            @click=${this.cancelEditingSession}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession ? 'true' : 'false'}
                        >
                            ${jsObject.translations.cancel}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-trainings', DashTrainings);
