import { html } from 'lit';
import { DashPage } from './dash-page';
import { Wizards } from '../wizard/wizard-constants'

export class DashMaps extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            scriptUrl: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.scriptUrl = ''
    }

    connectedCallback() {
        super.connectedCallback();
        this.openModal = this.openModal.bind(this)
        this.handleLoad = this.handleLoad.bind(this)
    }

    firstUpdated() {
        jQuery(this.renderRoot).foundation();
    }

    joinCommunity() {
        this.dispatchEvent(new CustomEvent('open-wizard', { bubbles: true, detail: { type: Wizards.joinCommunity } }))

        /* makeRequest('POST', 'log', { type: 'system', subtype: 'join_community' }, 'zume_system/v1/' ).done( ( data ) => {
            const stateEvent = new CustomEvent('user-state:change', { bubbles: true })
            this.dispatchEvent(stateEvent)
        }) */
    }

    openModal(event) {
        this.loading = true
        let map = event.target.dataset.map

        /* use this to load the iframes by src into one iframe tag in one modal */
        /* This works but the heatmap sites don't load the heatmap properly */
        if (true) {
            if (map === 'hundred-hour-map') {
                this.scriptUrl = 'https://zume.training/coaching/zume_app/last100_hours/'
            } else if (map === 'vision-map') {
                this.scriptUrl = 'https://zume.training/coaching/zume_app/heatmap_practitioner/'
            } else if (map === 'church-map') {
                this.scriptUrl = 'https://zume.training/coaching/zume_app/heatmap_churches/'
            } else {
                this.scriptUrl = ''
            }
            map = 'map'
        }

        const iframe = document.querySelector('#map-iframe')
        iframe.onload = this.handleLoad

        /* Having 3 iframes in 3 modals should work, but all 3 have trouble loading for some reason i haven't pushed into yet */

        const modal = document.querySelector(`#${map}-modal`)
        jQuery(modal).foundation('open')
    }

    handleLoad() {
        this.loading = false
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_maps}</h1>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main content p-2">
                    ${
                        this.showTeaser
                        ? html`
                          <div class="dash-menu__list-item">
                            <div class="dash-menu__icon-area | stack--5">
                              <span class="icon z-icon-locked dash-menu__list-icon"></span>
                            </div>
                            <div class="dash-menu__text-area | switcher | switcher-width-20">
                              <div>
                                <h3 class="f-1 bold uppercase">${jsObject.translations.my_maps_locked}</h3>
                                <p>${jsObject.translations.my_maps_explanation}</p>
                              </div>
                              <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                ${jsObject.translations.join_the_community}
                              </button>
                            </div>
                          </div>
                        `
                        : html`
                            <div class="stack">
                                <button class="btn" data-map="hundred-hour-map" @click=${this.openModal}>
                                    ${jsObject.translations.hundred_hour_map}
                                </button>
                                <button class="btn" data-map="vision-map" @click=${this.openModal}>
                                    ${jsObject.translations.training_vision_map}
                                </button>
                                <button class="btn" data-map="church-map" @click=${this.openModal}>
                                    ${jsObject.translations.simple_church_planting_map}
                                </button>
                            </div>
                        `
                    }
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                ${this.loading ? html`<span class="loading-spinner active"></span>` : ''}
                <iframe
                    id="map-iframe"
                    class="${this.loading ? 'opacity-0' : ''}"
                    src=${this.scriptUrl || ''}
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="hundred-hour-map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <iframe
                    src='https://zume.training/coaching/zume_app/last100_hours/'
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="vision-map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <iframe
                    src='https://zume.training/coaching/zume_app/heatmap_practitioner/'
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
            <div
                class="reveal full"
                data-reveal
                id="church-map-modal"
            >
                <button class="close-btn | ms-auto mb--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <iframe
                    src='https://zume.training/coaching/zume_app/heatmap_churches/'
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-maps', DashMaps);
