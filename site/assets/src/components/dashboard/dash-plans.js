import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';

export class DashPlans extends LitElement {
    static get properties() {
        return {
            loading: { type: Boolean, attribute: false },
            commitments: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.loading = true
        this.route = DashBoard.getRoute('my-plans')
        this.filterName = 'my-plans-filter'
        this.filterStatus = ZumeStorage.load(this.filterName)

        this.renderListItem = this.renderListItem.bind(this)
        this.closeCommitmentsModal = this.closeCommitmentsModal.bind(this)
    }

    firstUpdated() {
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

    openCommitmentsModal() {
        const modal = document.querySelector('#new-commitments-form')
        jQuery(modal).foundation('open')
    }

    closeCommitmentsModal() {
        const modal = document.querySelector('#new-commitments-form')
        jQuery(modal).foundation('close')
    }
    clearCommitmentsModal() {
        jQuery('.post-training-plan').each(function(value) {
            this.value = ''
        })
    }

    addCommitments() {
        jQuery('.post-training-plan').each(function(value) {
            const answer = jQuery(this).val();
            if ( answer ) {

                const question = jQuery(this).prev().text();
                console.log('Question: ' + question + ' Answer: ' + answer)

                var date = new Date(); // Now
                date.setDate(date.getDate() + 30);

                this.value = ''

                makeRequest('POST', 'commitment', {
                    "user_id": zumeDashboard.user_profile.user_id,
                    "post_id": zumeDashboard.user_profile.contact_id,
                    "meta_key": "tasks",
                    "note": 'Question: ' + question + ' Answer: ' + answer,
                    "question": question,
                    "answer": answer,
                    "date": date,
                    "category": "post_training_plan"
                }, 'zume_system/v1' ).done((data) => {
                    console.log(data)
                })
            }
        })
        this.closeCommitmentsModal()
    }

    completeCommitment(id) {

        let data = {
            id: id,
            user_id: zumeDashboard.user_profile.user_id
        }
        makeRequest('PUT', 'commitment', data, 'zume_system/v1' ).done( ( data ) => {
            this.fetchCommitments()
        })
    }

    deleteCommitment(id) {
        let data = {
            id: id,
            user_id: zumeDashboard.user_profile.user_id
        }
        makeRequest('DELETE', 'commitment', data, 'zume_system/v1' ).done( ( data ) => {
            this.closeMenu(id)
            this.fetchCommitments()
        })
    }

    editCommitment(id) {
        console.log(id)
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

    renderListItem(commitment) {
        const { question, answer, id, status } = commitment
        return html`
            <li class="list__item">
                <span>${question} <b>${answer}</b></span>
                <div class="list__secondary">
                    <div class="d-flex w-6rem justify-content-center">
                        ${status === 'closed'
                            ? html`<span class="icon zume-check-mark success"></span>`
                            : html`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${() => this.completeCommitment(id)}
                                >
                                    ${zumeDashboard.translations.done}
                                </button>
                            `
                        }
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${() => this.editCommitment(id)}><span class="icon zume-pencil"></span>${zumeDashboard.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${() => this.deleteCommitment(id)}><span class="icon zume-trash"></span>${zumeDashboard.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <div class="d-flex gap-0">
                        <h1 class="h3">${this.route.translation}</h1>
                        <button class="icon-btn f-2" @click=${this.openCommitmentsModal}>
                            <span class="visually-hidden">${zumeDashboard.translations.add_commitments}</span>
                            <span class="icon zume-plus brand-light" aria-hidden="true"></span>
                        </button>
                        <button class="icon-btn f-2" data-toggle="filter-menu">
                            <span class="visually-hidden">${zumeDashboard.translations.filter}</span>
                            <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'open' ? 'selected' : ''}" @click=${() => this.filterCommitments('open')}>
                                    <span class="icon zume-sort-todo" aria-hidden="true"></span>
                                    ${zumeDashboard.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'closed' ? 'selected' : ''}" @click=${() => this.filterCommitments('closed')}>
                                    <span class="icon zume-sort-done" aria-hidden="true"></span>
                                    ${zumeDashboard.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === '' ? 'selected' : ''}" @click=${() => this.filterCommitments('')}>
                                    <span class="icon zume-sort-all" aria-hidden="true"></span>
                                    ${zumeDashboard.translations.both}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                    ${
                        this.loading
                            ? html`<span class="loading-spinner active"></span>`
                            : html`
                                <ul class="list">
                                    <li class="list__item">
                                        <h2 class="f-1">I will</h2>
                                    </li>
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
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.clearCommitmentsModal}>
                        <img src=${`${zumeDashboard.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div id="pieces-content" class="stack">
                    <div class="stack--3">
                      <label for="plan_name">I will share My Story [Testimony] and God's Story [the Gospel] with the following individuals:</label>
                      <input type="text" name="" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to begin an Accountability Group with me:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will challenge the following people to begin their own Accountability Groups and train them how to do it:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to begin a 3/3 Group with me:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will challenge the following people to begin their own 3/3 Groups and train them how to do it:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to participate in a 3/3 Hope or Discover Group [see Appendix of Zúme Guidebook]</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to participate in Prayer Walking with me:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will Prayer Walk once every [days / weeks / months].</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will equip the following people to share their story and God's Story and make a List of 100 of the people in their relational network:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will challenge the following people to use the Prayer Cycle tool on a periodic basis:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will use the Prayer Cycle tool once every [days / weeks / months].</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will invite the following people to be part of a Leadership Cell that I will lead:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">I will encourage the following people to go through this Zúme Training course:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <label for="plan_name">Other commitments:</label>
                      <input type="text" class="post-training-plan" />
                    </div>
                    <div class="stack--3">
                      <button class="btn" @click=${this.addCommitments}>Save</button>
                    </div>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-plans', DashPlans);
