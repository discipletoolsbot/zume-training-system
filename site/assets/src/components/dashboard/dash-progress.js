import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';

export class DashProgress extends DashPage {
    static get properties() {
        return {
            loading: { type: Boolean, attribute: false },
            filteredItems: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
            hostProgress: { type: Object, attribute: false},
        };
    }

    constructor() {
        super()
        this.loading = false
        this.route = DashBoard.getRoute('my-progress')

        this.trainingItems = Object.values(jsObject.training_items)
        this.hostProgress = jsObject.host_progress

        this.filterName = 'my-progress-filter'
        this.filterStatus = ZumeStorage.load(this.filterName)

        this.filteredItems = this.filterItems(this.filterStatus)

        this.openStates = {}

        this.trainingItems.forEach(item => {
            this.openStates[item.key] = false
        });


        this.renderListItem = this.renderListItem.bind(this)
        this.closeInfoModal = this.closeInfoModal.bind(this)

    }

    updated() {
        jQuery(document).foundation();
    }

    openInfoModal() {
        const modal = document.querySelector('#new-commitments-form')
        jQuery(modal).foundation('open')
    }

    closeInfoModal() {
        const modal = document.querySelector('#new-commitments-form')
        jQuery(modal).foundation('close')
    }

    filterProgress(status) {
        this.filterStatus = status
        this.filteredItems = this.filterItems(status)
        console.log(this.filteredItems)
        ZumeStorage.save(this.filterName, status)
        this.closeFilter()
    }

    filterItems(status) {
        switch (status) {
            case 'heard':
                return this.trainingItems.filter((item) => {
                    const key = item.host[0].key
                    const heard = this.hostProgress.list[key] || false
                    return !!heard
                })
            case 'not-heard':
                return this.trainingItems.filter((item) => {
                    const key = item.host[0].key
                    const heard = this.hostProgress.list[key] || false
                    return !heard
                })
            default:
                return [ ...this.trainingItems ]
        }
    }

    closeFilter() {
        const menu = this.querySelector('#filter-menu')
        jQuery(menu).foundation('close')
    }

    toggleHost(host, event) {
        event.stopImmediatePropagation()
        const {type, subtype, key} = host
        const currentState = this.hostProgress.list[key]

        if (currentState === false) {
            makeRequest('POST', 'host', { type: type, subtype: subtype, user_id: jsObject.profile.user_id }, 'zume_system/v1' )
                .done( ( data ) => {
                    if ( Array.isArray(data) ) {
                        this.hostProgress.list[key] = true
                    }
                    this.loadHostStatus()
                })
        }

        if (currentState === true) {
            makeRequest('DELETE', 'host', { type: type, subtype: subtype, user_id: jsObject.profile.user_id }, 'zume_system/v1' )
                .done( ( data ) => {
                    if ( Array.isArray(data) ) {
                        this.hostProgress.list[key] = false
                    }
                    this.loadHostStatus()
                })
        }
    }

    loadHostStatus() {
        makeRequest('GET', 'host', { user_id: jsObject.profile.user_id }, 'zume_system/v1' )
            .done( ( data ) => {
                this.hostProgress = data
            })
    }

    toggleDetails(key) {
        const collapseElement = this.querySelector(`#details-${key}`)
        const open = this.openStates[key]
        const height = collapseElement.scrollHeight
        const transitionDuration = '200'

        if (open === false) {
            collapseElement.style.height = height + 'px'
            collapseElement.style.transitionDuration = transitionDuration + 'ms'
            collapseElement.dataset.state = 'opening'
            this.openStates[key] = true

            setTimeout(() => {
                collapseElement.style.height = 'auto'
                collapseElement.dataset.state = 'open'
            }, transitionDuration);
        } else {
            /* Add back the height so we can transition back to 0 */
            collapseElement.style.height = height + 'px'
            collapseElement.dataset.state = 'closing'
            this.openStates[key] = false

            /* Set the height to 0 after this function has finished so that we key the transition correctly */
            setTimeout(() => {
                collapseElement.style.height = '0'
            }, 10)
            setTimeout(() => {
                collapseElement.dataset.state = 'closed'
            }, transitionDuration);
        }
    }

    renderListItem(trainingItem) {
        const { title, description, host, slug, key } = trainingItem

        let url = [ jsObject.site_url, jsObject.language, slug ].join('/')

        if ( jsObject.language === 'en' ) {
            url = [ jsObject.site_url, slug ].join('/')
        }

        return html`
            <li class="switcher | switcher-width-30 list__item tight" @click=${() => this.toggleDetails(key)} role="button">
                <div>
                    <h2 class="h5 bold m0">${title}</h2>
                    <div class="collapse" id="details-${key}" data-state="closed">
                        <div class="stack--2 mt--2">
                            <p class="f--1 gray-700">${description}</p>
                            <div class="cluster">
                                <share-links url=${url} title=${title} .t=${jsObject.share_translations}></share-links>

                                ${
                                    jsObject.has_pieces_pages
                                    ? html`
                                        <a class="btn light uppercase" href=${url} @click=${(event) => event.stopImmediatePropagation()}>${jsObject.translations.view}</a>
                                    `
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list__secondary grow-0" data-align-start>
                    <div class="training-progress">
                        <button
                            data-subtype=${host[0].subtype}
                            class=${this.hostProgress.list[host[0].key] ? 'active' : ''}
                            @click=${(event) => this.toggleHost(host[0], event)}
                        >
                            <span class="icon zume-heard-concept"></span>
                        </button>
                        <button
                            data-subtype=${host[1].subtype}
                            class=${this.hostProgress.list[host[1].key] ? 'active' : ''}
                            @click=${(event) => this.toggleHost(host[1], event)}
                        >
                            <span class="icon zume-obey-concept"></span>
                        </button>
                        <button
                            data-subtype=${host[2].subtype}
                            class=${this.hostProgress.list[host[2].key] ? 'active' : ''}
                            @click=${(event) => this.toggleHost(host[2], event)}
                        >
                            <span class="icon zume-share-concept"></span>
                        </button>
                        <button
                            data-subtype=${host[3].subtype}
                            class=${this.hostProgress.list[host[3].key] ? 'active' : ''}
                            @click=${(event) => this.toggleHost(host[3], event)}
                        >
                            <span class="icon zume-train-concept"></span>
                        </button>
                    </div>
                </div>
            </li>
        `
    }

    render() {
        return html`
            <div class="dashboard__content" data-no-secondary-area>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu">
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openInfoModal}>
                                <span class="visually-hidden">${jsObject.translations.progress_info}</span>
                                <span class="icon zume-info brand-light" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'heard' ? 'selected' : ''}" @click=${() => this.filterProgress('heard')}>
                                    ${jsObject.translations.heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus === 'not-heard' ? 'selected' : ''}" @click=${() => this.filterProgress('not-heard')}>
                                    ${jsObject.translations.not_heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus === 'all' ? 'selected' : ''}" @click=${() => this.filterProgress('all')}>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${
                        html`
                            <ul class="list">
                                ${
                                    repeat(this.filteredItems, (trainingItem) => trainingItem.key, this.renderListItem)
                                }
                            </ul>
                        `
                    }
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button">
                        <img src=${`${jsObject.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div class="stack-2 host-info mx-2">
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="heard" percent=${this.hostProgress?.percent?.h || 0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.heard}</h3>
                            <p class="italic">${jsObject.translations.heard_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="obeyed" percent=${this.hostProgress?.percent?.o || 0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.obeyed}</h3>
                            <p class="italic">${jsObject.translations.obeyed_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="shared" percent=${this.hostProgress?.percent?.s || 0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.shared}</h3>
                            <p class="italic">${jsObject.translations.shared_explanation}</p>
                        </div>
                    </div>

                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="trained" percent=${this.hostProgress?.percent?.t || 0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.trained}</h3>
                            <p class="italic">${jsObject.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-progress', DashProgress);
