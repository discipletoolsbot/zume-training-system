import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';
import { Wizards } from '../wizard/wizard-constants';

export class DashTrainings extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            code: { type: String },
            loading: { type: Boolean, attribute: false },
            error: { type: String, attribute: false },
            training: { type: Object, attribute: false },
            sessions: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.loading = false
        this.error = ''
        this.route = DashBoard.getRoute('my-training')

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

    startSession(id) {
        const url = this.getSessionUrl(id)

        location.href = url
    }
    editSession(id) {}

    markSessionCompleted(id) {
        makeRequest( 'POST', 'plan/complete-session', { key: this.training.join_key, session_id: id }, 'zume_system/v1' )
            .then((result) => {
                this.refreshSessions(result)
            })
        /* Update the local store to reflect this change */
    }

    renderListItem(session) {
        const { id, name, datetime, completed } = session
        return html`
            <li class="list__item | switcher | switcher-width-20 gapy0">
                <div class="list__primary">
                    ${
                        this.currentSession === id ? html`
                            <button class="icon-btn" @click=${() => this.startSession(id)} aria-label=${jsObject.translations.start_session}>
                                <span class="icon z-icon-play brand-light"></span>
                            </button>
                        ` : html `
                            <span class="icon z-icon-check-mark success ${completed ? '' : 'invisible'} p--2"></span>
                        `
                    }
                    <span class="f-medium">${name}</span>
                </div>
                <div class="list__secondary">
                    <div class="d-flex justify-content-center">
                        ${datetime > 0 ? moment(datetime).format("MMM Do YY") : jsObject.translations.not_scheduled}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${() => this.editSession(id)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit_time}</button></li>
                        <li><button class="menu-btn" @click=${() => this.markSessionCompleted(id)}><span class="icon z-icon-pencil"></span>${jsObject.translations.mark_completed}</button></li>
                        <li><button class="menu-btn" @click=${() => this.startSession(id)}><span class="icon z-icon-play"></span>${jsObject.translations.start_session}</button></li>
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
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <button
                        class="icon-btn f-2 brand-light"
                        aria-label=${jsObject.translations.create_training_group}
                        @click=${this.createTraining}
                    >
                        <span class="icon z-icon-plus"></span>
                    </button>
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
                                        class="btn brand tight light mt--2"
                                    >
                                        ${jsObject.translations.invite_friends}
                                    </button>
                                </div>
                            ` : ''
                    }
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-trainings', DashTrainings);
