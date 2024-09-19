import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'

export class CheckinDashboard extends LitElement {
    static get properties() {
        return {
            error: { type: Boolean, attribute: false },
            sessionNumber: { type: Number, attribute: false },
            hostProgress: { type: Object, attribute: false},
            errorMessage: { type: String, attribute: false },
            showHelp: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()
        this.error = false
        this.showHelp = true
        this.numberOfSessions = this.getNumberOfSessions()
        this.sessionNumber = this.getSessionNumber()

        this.hostProgress = jsObject.host_progress
        this.trainingItems = Object.values(jsObject.training_items)
        this.errorMessage = ''

        this.renderListItem = this.renderListItem.bind(this)
        this.scrollToLastItem = this.scrollToLastItem.bind(this)
    }

    firstUpdated() {
        jQuery(this.renderRoot).foundation();

        this.scrollToLastItem()
        if (!this.error) {
            this.showCelebrationModal()

            setTimeout(() => {
                this.closeCelebrationModal()
            }, 1400)
        }
        const modal = document.querySelector('#celebration-modal')
        jQuery(modal).on('closed.zf.reveal', this.scrollToLastItem)
    }

    openModal(selector) {
        const modal = document.querySelector(selector)
        jQuery(modal).foundation('open')
    }
    closeModal(selector) {
        const modal = document.querySelector(selector)
        jQuery(modal).foundation('close')
    }

    showCelebrationModal() {
        this.openModal('#celebration-modal')
    }
    closeCelebrationModal() {
        this.closeModal('#celebration-modal')
    }

    scrollToLastItem() {
        const sessionNumber = this.getSessionNumber()
        if (sessionNumber === 1) {
            return
        }

        const lastSession = sessionNumber - 1

        const lastSessionTrainingItems = jsObject.session_items[lastSession]

        const scrollItem = document.querySelector(`#key-${lastSessionTrainingItems[0] }`)

        console.log(scrollItem, scrollItem.offsetTop)

        window.scrollTo({ top: scrollItem.offsetTop })

        location.hash = lastSession
    }

    closeHelp() {
        this.showHelp = false
    }

    openInfo() {
        this.openModal('#info-modal')
    }

    closeInfo() {
        this.closeModal('#info-modal')
    }

    getSessionKey() {
        const url = new URL(location.href)
        const code = url.searchParams.get('code')

        const sessionKeys = jsObject.session_keys

        const sessionKey = sessionKeys[code] ?? ''

        return sessionKey
    }
    getNumberOfSessions() {
        const sessionKey = this.getSessionKey()

        if (!sessionKey) {
            this.error = true

            return 0
        }

        const keyParts = sessionKey.split('_')
        if (keyParts[1] === 'a') {
            return 10
        }
        if (keyParts[1] === 'b') {
            return 20
        }
        if (keyParts[1] === 'c') {
            return 5
        }
        this.error = true

        return 0
    }

    getSessionNumber() {
        const sessionKey = this.getSessionKey()

        if (!sessionKey) {
            return 0
        }

        const keyParts = sessionKey.split('_')
        const sessionNumber = Number( keyParts[2] )

        if (Number.isNaN(sessionNumber)) {
            return 0
        }

        return sessionNumber
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
                    this.changeHost(key, true)
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

    renderListItem(trainingItem) {
        const { title, description, host, slug, key } = trainingItem

        return html`
            <li class="stack--2 center py-1" id=${`key-${key}`}>
                <p class="f-medium">${title}</p>
                <host-progress-bar
                    .host=${host}
                    .hostProgressList=${this.hostProgress.list}
                    @host:toggle=${this.toggleHost}
                ></host-progress-bar>
            </li>
        `
    }

    render() {
        if (this.error) {
            return html`
                <div class="text-center">
                    <h1 class="h2 brand-light mb0">${jsObject.translations.woops}</h1>
                    <hr class="mt0">
                    <p>${jsObject.translations.something_went_wrong}</p>
                    <a href="" class="btn ">${jsObject.translations.dashboard}</a>
                </div>
            `
        }
        return html`
            <div class="text-center position-relative">
                <div class="fixed bottom left right bg-white p--1 hard-shadow ${this.showHelp ? '' : 'hidden'}">
                    <button
                        class="ms-auto close-btn"
                        data-close
                        aria-label=${jsObject.translations.close}
                        type="button"
                        @click=${this.closeHelp}
                    >
                        <span class="icon z-icon-close"></span>
                    </button>
                    <p>
                        ${jsObject.translations.check_off_items}
                    </p>
                    <button class="link brand-light" @click=${this.openInfo}><span class="icon z-icon-info"></span> ${jsObject.translations.learn_more}</button>
                </div>

                <ul class="border-between">
                    ${repeat(this.trainingItems, (item) => item.key, this.renderListItem)}
                </ul>

            </div>

            <div
                class="stack | reveal tiny card celebration showing | border-none"
                id="celebration-modal"
                data-reveal
                data-initial-top
                data-not-fullscreen
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeCelebrationModal}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <h2 class="h5 text-center bold">
                    ${jsObject.translations.congratulations}
                </h2>
                <p class="f-medium">
                    ${jsObject.translations.checked_in}
                </p>
                <div class="d-flex align-items-center justify-content-between">
                    <img
                        class="w-30"
                        src="${jsObject.images_url + '/fireworks-2.svg'}"
                        alt=""
                    />
                    <img
                        class="w-40"
                        src="${jsObject.images_url + '/thumbs-up.svg'}"
                        alt=""
                    />
                    <img
                        class="w-30"
                        src="${jsObject.images_url + '/fireworks-2.svg'}"
                        alt=""
                    />
                </div>
            </div>
            <div class="reveal large" id="info-modal" data-reveal data-v-offset="20">
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
customElements.define('checkin-dashboard', CheckinDashboard);
