import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';

export class DashTrainings extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            loading: { type: Boolean, attribute: false },
            sessions: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
            selectedDates: { type: Array, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.loading = false
        this.route = DashBoard.getRoute('my-training')

        /* @todo remove this hardcoded section ?? maybe? */
        this.selectedDates = []
        this.currentSession = 'set_a_06'
        this.sessions = [
            {
                id: 'set_a_01',
                name: 'Session 1',
                datetime: 1712077989881,
                completed: true,
            },
            {
                id: 'set_a_02',
                name: 'Session 2',
                datetime: 1712077989881,
                completed: true,
            },
            {
                id: 'set_a_03',
                name: 'Session 3',
                datetime: 1712077989881,
                completed: true,
            },
            {
                id: 'set_a_04',
                name: 'Session 4',
                datetime: 1712077989881,
                completed: true,
            },
            {
                id: 'set_a_05',
                name: 'Session 5',
                datetime: 1712077989881,
                completed: true,
            },
            {
                id: 'set_a_06',
                name: 'Session 6',
                datetime: 1712077989881,
                completed: false,
            },
            {
                id: 'set_a_07',
                name: 'Session 7',
                datetime: 1712077989881,
                completed: false,
            },
            {
                id: 'set_a_08',
                name: 'Session 8',
                datetime: 1712077989881,
                completed: false,
            },
            {
                id: 'set_a_09',
                name: 'Session 9',
                datetime: 1712077989881,
                completed: false,
            },
            {
                id: 'set_a_10',
                name: 'Session 10',
                datetime: 1712077989881,
                completed: false,
            },
        ]

        this.groupMembers = [
            {
                id: 1,
                name: 'Billy Bob',
            },
            {
                id: 2,
                name: 'Sandy Lou',
            },
            {
                id: 3,
                name: 'Willy Joe',
            },
            {
                id: 4,
                name: 'Bonnie Sue',
            },
        ]

        this.renderListItem = this.renderListItem.bind(this)
    }

    firstUpdated() {
        super.firstUpdated()
    }

    editSession(id) {}

    updated() {
        jQuery(document).foundation();
    }

    renderListItem(session) {
        const { id, name, datetime, completed } = session
        return html`
            <li class="list__item | switcher | switcher-width-20">
                <div class="list__primary">
                    ${
                        this.currentSession === id ? html`
                            <button class="icon-btn">
                                <span class="icon zume-play brand-light"></span>
                            </button>
                        ` : html `
                            <span class="icon zume-check-mark success ${completed ? '' : 'invisible'} p--2"></span>
                        `
                    }
                    <span class="f-medium">${name}</span>
                </div>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${moment(datetime).format("MMM Do YY")}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${() => this.editSession(id)}><span class="icon zume-pencil"></span>${jsObject.translations.edit_time}</button></li>
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
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-1">
                    ${
                        this.showTeaser
                        ? html`
                            <div class="container-inline">
                              <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.my_training_locked}</h3>
                                    <p>${jsObject.translations.plan_a_training_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
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
                    <dash-cta></dash-cta>
                    <div class="card | group-members | grow-0">
                        <button class="f-0 f-medium d-flex align-items-center gap--2 black">
                            <span class="icon zume-group brand-light"></span> ${jsObject.translations.group_members} (${this.groupMembers.length})
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
                        <button class="btn brand tight light mt--2">
                            ${jsObject.translations.invite_friends}
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
