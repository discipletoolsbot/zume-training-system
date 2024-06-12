import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';
import { zumeRequest } from '../../js/scripts';

export class DashPlans extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            loading: { type: Boolean, attribute: false },
            saving: { type: Boolean, attribute: false },
            commitments: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
            editQuestion: { type: String, attribute: false },
            editAnswer: { type: String, attribute: false },
            editId: { type: Number, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.loading = true
        this.saving = false
        this.route = DashBoard.getRoute('my-plans')
        this.filterName = 'my-plans-filter'
        this.filterStatus = ZumeStorage.load(this.filterName)
        this.commitments = []
        this.editQuestion = ''
        this.editAnswer = ''

        this.renderListItem = this.renderListItem.bind(this)
        this.closeCommitmentsModal = this.closeCommitmentsModal.bind(this)
    }

    firstUpdated() {
        super.firstUpdated()
        const status = this.filterStatus || ''
        this.fetchCommitments(status)
    }

    updated() {
        jQuery(document).foundation();
    }

    fetchCommitments() {
        const status = this.filterStatus
        makeRequest('GET', 'commitments', { status }, 'zume_system/v1' )
            .done( ( data ) => {
                this.commitments = data
            })
            .always(() => {
                this.loading = false
            })
    }

    openEditCommitmentsModal(id) {
        this.closeMenu(id)
        const commitment = this.getCommitment(id)

        document.querySelector('#edit-question').value = commitment.question
        document.querySelector('#edit-answer').value = commitment.answer
        this.editId = id

        this.openCommitmentsModal('edit')

        document.querySelector('#edit-question').focus()
    }
    closeCommitmentsModal() {
        document.querySelector('#edit-question').value = ''
        document.querySelector('#edit-answer').value = ''
        const modal = document.querySelector('#commitments-form')
        jQuery(modal).foundation('close')
    }

    handleOpenCommitmentsModal(event) {
        this.openCommitmentsModal('add')
    }

    openCommitmentsModal(mode = 'add') {
        if (this.showTeaser) {
            return
        }
        this.mode = mode

        const modal = document.querySelector('#commitments-form')
        jQuery(modal).foundation('open')
    }

    handleAddedCommitments() {
        this.fetchCommitments()
        this.closeCommitmentsModal()
    }

    getCommitment(commitmentId) {
        return this.commitments.find(({id}) => id === commitmentId)
    }

    completeCommitment(id) {
        let data = {
            id: id,
            user_id: jsObject.profile.user_id
        }
        makeRequest('PUT', 'commitment', data, 'zume_system/v1' ).done( ( data ) => {
            this.fetchCommitments()
        })
    }

    deleteCommitment(id) {
        let data = {
            id: id,
            user_id: jsObject.profile.user_id
        }
        makeRequest('DELETE', 'commitment', data, 'zume_system/v1' ).done( ( data ) => {
            this.closeMenu(id)
            this.fetchCommitments()
        })
    }
    saveCommitment(event) {
        event.preventDefault()
        this.saving = true
        if (this.mode === 'add') {
            this.addCommitment()
        } else {
            this.editCommitment()
        }
    }
    addCommitment() {
        const question = document.querySelector('#edit-question').value
        const answer = document.querySelector('#edit-answer').value

        const date = new Date(); // Now
        date.setDate(date.getDate() + 30);

        let data = {
            question,
            answer,
            note: `${jsObject.translations.question}: ${question} ${jsObject.translations.answer}: ${answer}`,
            date,
            category: 'post_training_plan',
        }
        zumeRequest.post('commitment', data)
            .then(() => {
                this.fetchCommitments()
                this.closeCommitmentsModal()
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.saving = false
            })
    }

    editCommitment() {
        const question = document.querySelector('#edit-question').value
        const answer = document.querySelector('#edit-answer').value
        let data = {
            id: this.editId,
            user_id: jsObject.profile.user_id,
            question,
            answer,
        }
        this.saving = true
        zumeRequest.update('commitment', data)
            .then((response) => {
                this.closeCommitmentsModal()
                this.fetchCommitments()
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.saving = false
            })
    }

    filterCommitments(status) {
        this.filterStatus = status
        this.fetchCommitments(status)
        ZumeStorage.save(this.filterName, status)
        this.closeFilter()
    }

    closeFilter() {
        const menu = this.querySelector('#filter-menu')
        jQuery(menu).foundation('close')
    }

    closeMenu(id) {
        const menu = this.querySelector(`#kebab-menu-${id}`)
        jQuery(menu).foundation('close')
    }
    open3MonthPlan() {
        this.dispatchEvent(new CustomEvent('open-3-month-plan', { bubbles: true }))
    }

    renderListItem(commitment) {
        const { question, answer, id, status } = commitment
        return html`
            <li class="list__item | switcher | switcher-width-30">
                <span>${question} <b>${answer}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${status === 'closed'
                            ? html`<span class="icon z-icon-check-mark success"></span>`
                            : html`
                                <button
                                    class="btn tight break-anywhere"
                                    @click=${() => this.completeCommitment(id)}
                                >
                                    ${jsObject.translations.done}
                                </button>
                            `
                        }
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div
                    class="dropdown-pane"
                    id="kebab-menu-${id}"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl ? 'right' : 'left'}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        <li><button class="menu-btn" @click=${() => this.openEditCommitmentsModal(id)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn red" @click=${() => this.deleteCommitment(id)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `
    }

    render() {
        return html`
            <div class="dashboard__content" data-no-secondary-area>
                <dash-header-right></dash-header-right>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.handleOpenCommitmentsModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
                                <span class="visually-hidden">${jsObject.translations.add_commitments}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'open' ? 'selected' : ''}" @click=${() => this.filterCommitments('open')}>
                                    <span class="icon z-icon-sort-todo" aria-hidden="true"></span>
                                    ${jsObject.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'closed' ? 'selected' : ''}" @click=${() => this.filterCommitments('closed')}>
                                    <span class="icon z-icon-sort-done" aria-hidden="true"></span>
                                    ${jsObject.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'all' ? 'selected' : ''}" @click=${() => this.filterCommitments('all')}>
                                    <span class="icon z-icon-sort-all" aria-hidden="true"></span>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__main content">
                    ${
                        this.showTeaser ? html`
                          <div class="p-2">
                            <div class="dash-menu__list-item">
                              <div class="dash-menu__icon-area | stack--5">
                                <span class="icon z-icon-locked dash-menu__list-icon"></span>
                              </div>
                              <div class="dash-menu__text-area | switcher | switcher-width-20">
                                <div>
                                  <h3 class="f-1 bold uppercase">${jsObject.translations.my_plans_locked}</h3>
                                  <p>${jsObject.translations.my_plans_locked_explanation}</p>
                                </div>
                                <button class="dash-menu__view-button btn tight" @click=${this.open3MonthPlan}>
                                  ${jsObject.translations.create_3_month_plan}
                                </button>
                              </div>
                            </div>
                          </div>
                        ` :  html`
                                <ul class="list">
                                  ${
                                    !this.loading && this.commitments && this.commitments.length > 0
                                      ? repeat(this.commitments, (commitment) => commitment.id, this.renderListItem)
                                      : ''
                                  }
                                </ul>
                            `
                    }
                </div>
            </div>
            <div class="reveal small" id="commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeCommitmentsModal}>
                        <span class="icon z-icon-close"></span>
                </button>
                <form @submit=${this.saveCommitment} class="stack">
                    <div class="form-group">
                        <label for="edit-question">${jsObject.three_month_plan_translations.question}*</label>
                        <textarea
                            class="input"
                            id="edit-question"
                            type="text"
                            rows="3"
                            placeholder=${jsObject.three_month_plan_translations.question}
                            required
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="edit-answer">${jsObject.three_month_plan_translations.answer}*</label>
                        <textarea
                            class="input"
                            id="edit-answer"
                            type="text"
                            placeholder=${jsObject.three_month_plan_translations.answer}
                            required
                        ></textarea>
                    </div>
                    <div class="cluster justify-flex-end">
                        <button type="button" class="btn outline tight" type="button" @click=${this.closeCommitmentsModal}>${jsObject.three_month_plan_translations.cancel}</button>
                        <button type="submit" class="btn tight" type="button" ?disabled=${this.saving}>
                            ${jsObject.three_month_plan_translations.save}
                            <span class="loading-spinner ${this.saving ? 'active' : ''}"></span>
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-plans', DashPlans);
