import { LitElement, html } from 'lit';

export class DashMaps extends LitElement {

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Maps</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
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
