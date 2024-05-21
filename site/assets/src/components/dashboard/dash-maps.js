import { html } from 'lit';
import { DashPage } from './dash-page';

export class DashMaps extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
    }

    joinCommunity() {
        makeRequest('POST', 'log', { type: 'system', subtype: 'join_community' }, 'zume_system/v1/' ).done( ( data ) => {
            const stateEvent = new CustomEvent('user-state:change', { bubbles: true })
            this.dispatchEvent(stateEvent)
        })
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
                            <div class="container-inline">
                              <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
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
                            </div>
                        `
                        : html`
                            <p>You can now see your vision maps here. (If you imagine them hard enough)</p>
                        `
                    }
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-maps', DashMaps);
