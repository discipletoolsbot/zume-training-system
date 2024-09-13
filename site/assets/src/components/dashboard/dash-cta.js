import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { zumeRequest } from '../../js/zumeRequest';
import { navigator } from 'lit-element-router';

export class DashCta extends navigator(LitElement) {
    static get properties() {
        return {
            ctas: { type: Array, attribute: false },
        };
    }

    static FADE_TIMEOUT = 3000
    static TRANSITION_TIMEOUT = 500
    static MAX_CTAS = 3

    constructor() {
        super()
        this.allCtas = []
        this.ctas = []

        this.celebrations = []
        this.hiddenCtaKeys = []
        this.initialCtaKeys = []
        this.removedCtaKeys = []

        this.celebrationsLogged = []

        this.manageCtas = this.manageCtas.bind(this)
        this.transitionIn = this.transitionIn.bind(this)
        this.transitionCtas = this.transitionCtas.bind(this)
        this.renderCta = this.renderCta.bind(this)
    }

    connectedCallback() {
        super.connectedCallback();

        window.addEventListener('ctas:changed', this.manageCtas)
        this.addEventListener('begin-cta-transitions', this.transitionIn)
        this.addEventListener('cta-transition-in-ended', this.logCelebrationsSeen)
    }
    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('ctas:changed', this.manageCtas)
        this.removeEventListener('begin-cta-transitions', this.transitionIn)
        this.removeEventListener('cta-transition-in-ended', this.logCelebrationsSeen)
    }
    firstUpdated() {
        this.manageCtas()
    }
    updated() {
        if (this.dispatchEventAfterUpdated) {
            this.dispatchEventAfterUpdated = false

            setTimeout(() => {
                this.dispatchEvent(new CustomEvent('begin-cta-transitions'))
            }, 10)
        }
    }

    manageCtas() {
        /* Get the new CTAs */
        const newCtas = this.getCtas()

        /* Compare new to old to get the diff */
        const [ comingCtas, stayingCtas, goingCtas ] = this.diffCtas(newCtas, this.ctas)

        const celebrations = [...comingCtas, ...stayingCtas].filter(({content_template}) => content_template === 'celebration')
        const nonCelebrations = [...comingCtas, ...stayingCtas].filter(({content_template}) => content_template !== 'celebration')

        const organisedCtas = [...celebrations, ...nonCelebrations]
        const organisedCtaKeys = this.getCtaKeys(organisedCtas)

        const goingCtaKeys = this.getCtaKeys(goingCtas)

        /* anything that is new, should start as hidden */
        this.ctas = organisedCtas
        this.celebrations = celebrations

        this.hiddenCtaKeys = this.getCtaKeys(comingCtas)
        this.removedCtaKeys = [...goingCtaKeys, ...organisedCtaKeys.slice(DashCta.MAX_CTAS)]
        this.initialCtaKeys = organisedCtaKeys.slice(0, DashCta.MAX_CTAS)

        if (this.ctas.length > 0) {
            this.dispatchEventAfterUpdated = true
        }
    }
    getCtas() {
        return jsObject.allCtas ?? []
    }
    /**
     * Find the different CTAs in both, old or new arrays
     *
     * @param {array} newCtas
     * @param {array} oldCtas
     *
     * @returns {array}
     */
    diffCtas(newCtas, oldCtas) {
        /* Get only new, only old and same */
        /* [ a, b, c] [ b, c, d, e ] */
        const onlyNew = newCtas.filter(({key: newKey}) => oldCtas.findIndex(({key: oldKey}) => oldKey === newKey) === -1)
        const onlyOld = oldCtas.filter(({key: oldKey}) => newCtas.findIndex(({key: newKey}) => newKey === oldKey) === -1)
        const inBoth = oldCtas.filter(({key: oldKey}) => newCtas.findIndex(({key: newKey}) => newKey === oldKey) > -1)

        return [onlyNew, inBoth, onlyOld]
    }
    transitionIn() {
        this.transitionCtas(this.removedCtaKeys, this.initialCtaKeys)

        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('cta-transition-in-ended'))
        }, DashCta.TRANSITION_TIMEOUT)
    }
    logCelebrationsSeen() {
        this.celebrations.forEach(({type, subtype}) => {
            if (!this.celebrationsLogged.includes(type + subtype)) {
                zumeRequest.post( 'log', { type, subtype, log_once: true })
                this.celebrationsLogged.push(type + subtype)
            }
        })
        const celebrationKeys = this.getCtaKeys(this.celebrations)
        jsObject.allCtas = jsObject.allCtas.filter(({key}) => !celebrationKeys.includes(key))
    }
    /**
     * @param {array} outKeys Keys of ctas to transition out
     * @param {array} inKeys Keys of ctas to transition in
     */
    transitionCtas(outKeys, inKeys) {
        const transitioningInElements = outKeys.length > 0 ? this.getCtaElements(outKeys) : []
        transitioningInElements.forEach((element) => {
            if (!element) {
                return
            }
            element.style.height = element.clientHeight + 'px'
            setTimeout(() => {
                element.classList.add('transition-out')
                element.style.height = ''
            }, 10)
        })
        const transitioningOutElements = inKeys.length > 0 ? this.getCtaElements(inKeys) : []
        transitioningOutElements.forEach((element) => {
            if (!element) {
                return
            }
            element.classList.remove('hiding')
            element.classList.add('showing')
        })
    }
    getCtaElements(keys) {
        return this.renderRoot.querySelectorAll(keys.map((key) => `[data-key="${key}"]`).join(','))
    }
    /**
     * Get the keys from an arary of CTAs
     * @param {array} ctas
     * @returns {array}
     */
    getCtaKeys(ctas) {
        return ctas.map(({key}) => key)
    }
    isWizardLink(link) {
        return link.includes('/wizard/')
    }
    openWizard(link) {
        const urlParts = link.split('/')
        const wizardType = urlParts[urlParts.length - 1]

        dispatchEvent(new CustomEvent('open-wizard', { bubbles: true, detail: { type: wizardType } }))
    }
    openModal(link) {
        const urlParts = link.split('/')
        const modalEvent = urlParts[urlParts.length - 1]

        this.dispatchEvent(new CustomEvent(modalEvent, { bubbles: true }))
    }

    renderLink(content) {
        if (this.isWizardLink(content.link)) {
            return html`
                <button class="btn" @click=${() => this.openWizard(content.link)}>${content.link_text}</button>
            `
        }
        if (content.link.includes('modal/')) {
            return html`
                <button class="btn" @click=${() => this.openModal(content.link)}>${content.link_text}</button>
            `
        }
        if (content.link.includes('/dashboard/')) {
            return html`
                <a class="btn" @click=${(e) => {
                    e.preventDefault()
                    this.navigate(content.link)
                }}>${content.link_text}</a>
            `
        }
        return html`
            <a href="${content.link}" class="btn">${content.link_text}</a>
        `
    }

    renderCta({ content, content_template, key }) {
        const classes = this.hiddenCtaKeys.includes(key) ? 'hiding' : 'showing'
        if (content_template === 'card') {
            return html`
                <div class="stack | card cta ${classes}" data-key=${key} style="--duration: ${DashCta.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${content.title}</h2>
                    <p>${content.description}</p>
                    ${this.renderLink(content)}
                </div>
            `
        }
        if (content_template === 'celebration') {
            return html`
                <div class="stack | card celebration ${classes}" data-key=${key} style="--duration: ${DashCta.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center bold">${content.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                        <img src="${content.image_url}" alt="" />
                        <img src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                    </div>
                    <p>${content.description}</p>
                </div>
            `
        }
    }

    render() {
        return html`
            <div class="stack-margin-bottom">
                ${repeat(this.ctas, (cta) => cta.key, this.renderCta)}
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-cta', DashCta);
