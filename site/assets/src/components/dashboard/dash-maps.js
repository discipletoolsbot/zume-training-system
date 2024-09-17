import { html } from 'lit';
import { DashPage } from './dash-page';
import { Wizards } from '../wizard/wizard-constants'
// import { zumeRequest } from '../../js/zumeRequest';

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

        const iframe = document.querySelector('#map-iframe')
        iframe.addEventListener('load', this.handleLoad)
    }

    joinCommunity() {
        this.dispatchEvent(new CustomEvent('open-wizard', { bubbles: true, detail: { type: Wizards.joinCommunity } }))
    }

    openModal(event) {
        let map = event.target.dataset.map

        const currentUrl = this.scriptUrl

        /* use this to load the iframes by src into one iframe tag in one modal */
        /* This works but the heatmap sites don't load the heatmap properly */
        if (true) {
            if (map === 'hundred-hour-map') {
                this.scriptUrl = '/zume_app/last100_hours?show-exit-button'
            } else if (map === 'vision-map') {
                this.scriptUrl = '/zume_app/heatmap_trainees?show-exit-button'
            } else if (map === 'church-map') {
                this.scriptUrl = '/zume_app/heatmap_churches?show-exit-button'
            } else {
                this.scriptUrl = ''
            }
        }

        if (currentUrl !== this.scriptUrl) {
            this.loading = true
        }

        const modal = document.querySelector(`#map-modal`)
        jQuery(modal).foundation('open')
    }

    handleLoad() {
        this.loading = false

        this.attachExitButtonEventHandler()
    }

    attachExitButtonEventHandler() {
        const iframe = document.querySelector('#map-iframe')
        const exitButton = iframe.contentDocument.querySelector('#exit-btn')
        exitButton?.addEventListener('click', (event) => {
            this.closeModal()
        })
    }

    closeModal() {
        const modal = document.querySelector(`#map-modal`)
        jQuery(modal).foundation('close')
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
                style="padding: 0 !important; overflow: hidden;"
                data-reveal
                id="map-modal"
            >
                ${this.loading ? html`
                    <div class="cover-page">
                        <div class="center">
                            <span class="loading-spinner active"></span>
                        </div>
                    </div>
                ` : ''}
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
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-maps', DashMaps);
