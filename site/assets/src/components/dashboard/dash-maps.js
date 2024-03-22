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
                    <h1 class="h3">Maps</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${
                        this.showTeaser
                        ? html`
                            <p>Join the community to get access to the maps area</p>
                            <button class="btn" @click=${this.joinCommunity}>
                                Join
                            </button>
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
