import { LitElement, html } from 'lit';

export class DashContent extends LitElement {

    render() {
        return html`
            <div class="dashboard__header">
            </div>

            <div class="dashboard__main">
            </div>

            <div class="dashboard__secondary">
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-content', DashContent);
