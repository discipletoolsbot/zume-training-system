import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';
import { zumeRequest } from '../../js/zumeRequest';
import { zumeAttachObservers, zumeDetachObservers } from '../../js/zumeAttachObservers';

export class DashProgress extends DashPage {
    static get properties() {
        return {
            loading: { type: Boolean, attribute: false },
            filteredItems: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
            hostProgress: { type: Object, attribute: false},
            errorMessage: { type: String, attribute: false },
            openStates: { type: Object, attribute: false },
        };
    }

    constructor() {
        super()
        this.loading = false
        this.route = DashBoard.getRoute('my-progress')

        this.trainingItems = Object.values(jsObject.training_items)
        this.hostProgress = jsObject.host_progress
        this.errorMessage = ''

        this.filterName = 'my-progress-filter'
        this.filterStatus = ZumeStorage.load(this.filterName)

        this.filteredItems = this.filterItems(this.filterStatus)

        this.openStates = {}

        this.trainingItems.forEach(item => {
            this.openStates[item.key] = false
        });


        this.renderListItem = this.renderListItem.bind(this)
        this.closeInfoModal = this.closeInfoModal.bind(this)
        document.querySelectorAll('.reveal-overlay #progress-modal').forEach((element) => {
            element.parentElement.remove()
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        zumeDetachObservers(this.tagName)
    }

    firstUpdated() {
        super.firstUpdated()

        zumeAttachObservers(this.renderRoot, this.tagName)
    }

    updated() {
        jQuery(this.renderRoot).foundation();
        zumeAttachObservers(this.renderRoot, this.tagName)
    }

    openInfoModal() {
        const modal = document.querySelector('#progress-modal')
        jQuery(modal).foundation('open')
    }

    closeInfoModal() {
        const modal = document.querySelector('#progress-modal')
        jQuery(modal).foundation('close')
    }

    filterProgress(status) {
        this.filterStatus = status
        this.filteredItems = this.filterItems(status)
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

    toggleHost(event) {

        const { host, additionalHostToCredit } = event.detail
        event.stopImmediatePropagation()
        const {type, subtype, key} = host
        const currentState = this.hostProgress.list[key]

        if (currentState === false) {
            this.changeHost(key, true)

            additionalHostToCredit.forEach(({key}) => this.changeHost(key, true))

            return zumeRequest.post('host', { type: type, subtype: subtype, user_id: jsObject.profile.user_id } )
                .then( ( data ) => {
                    //console.log(data)
                })
                .catch((error) => {
                    this.changeHost(key, false)
                    additionalHostToCredit.forEach(({key}) => this.changeHost(key, false))

                    this.displayError(jsObject.translations.error_with_request)
                })
        }

        if (currentState === true) {
            this.changeHost(key, false)
            return zumeRequest.delete('host', { type: type, subtype: subtype, user_id: jsObject.profile.user_id } )
                .catch((error) => {
                    this.changeHost(key, false)
                    this.displayError(jsObject.translations.error_with_request)
                })

        }
    }

    displayError(message) {
        this.errorMessage = message
        setTimeout(() => {
            this.errorMessage = ''
        }, 4000)
    }

    changeHost(key, value) {
        const newHostProgress = { ...this.hostProgress }
        newHostProgress.list = { ...this.hostProgress.list }
        newHostProgress.list[key] = value
        this.hostProgress = { ...newHostProgress }
    }

    toggleDetails(key) {
        const open = this.openStates[key]

        if (open === false) {
            this.openStates = {
                ...this.openStates,
                [key]: true
            }
        } else {
            this.openStates = {
                ...this.openStates,
                [key]: false,
            }
        }
    }

    renderListItem(trainingItem) {
        const { title, description, host, slug, key } = trainingItem

        let url = [ jsObject.site_url, jsObject.language, slug ].join('/')

        if ( jsObject.language === 'en' ) {
            url = [ jsObject.site_url, slug ].join('/')
        }

        return html`
            <li class=" list__item tight" role="button" data-no-flex>
                <div class="switcher | switcher-width-30">
                    <div>
                        <h2 class="h5 bold m0">${title}</h2>
                    </div>
                    <div class="list__secondary">
                        <host-progress-bar
                            .host=${host}
                            .hostProgressList=${this.hostProgress.list}
                            @host:toggle=${this.toggleHost}
                        ></host-progress-bar>
                        <button
                            class="icon-btn"
                            aria-label=${jsObject.translations.show_details}
                            aria-pressed=${this.openStates[key] ? 'true' : 'false'}
                            @click=${() => this.toggleDetails(key)}
                        >
                            <img
                                class="chevron | svg w-1rem h-1rem ${this.openStates[key] ? 'rotate-180' : ''}"
                                src=${jsObject.images_url + '/chevron.svg'}
                            />
                        </button>
                    </div>
                </div>
                <div class="list__tertiary zume-collapse" id="details-${key}" ?data-expand=${this.openStates[key]}>
                    <div class="stack--2 mt--2">
                        <p class="f--1 gray-700">${description}</p>
                        <div class="cluster">
                            <share-links url=${url} title=${title} .t=${jsObject.share_translations}></share-links>

                            ${
                                jsObject.has_pieces_pages
                                ? html`
                                    <a class="btn" href=${url} @click=${(event) => event.stopImmediatePropagation()}>${jsObject.translations.view}</a>
                                `
                                : ''
                            }
                        </div>
                    </div>
                </div>
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
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu">
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter brand-light" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openInfoModal}>
                                <span class="visually-hidden">${jsObject.translations.progress_info}</span>
                                <span class="icon z-icon-info brand-light" aria-hidden="true"></span>
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
                <div class="dashboard__main content position-relative">
                    ${
                        html`
                            <ul class="list">
                                ${
                                    repeat(this.filteredItems, (trainingItem) => trainingItem.key, this.renderListItem)
                                }
                            </ul>
                        `
                    }

                    <div class="fixed bottom left right ${this.errorMessage.length ? 'p-1' : ''}">
                        <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
                    </div>
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div class="reveal large" id="progress-modal" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button">
                        <span class="icon z-icon-close"></span>
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
