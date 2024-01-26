import { LitElement, html } from 'lit';

export class DashGettingStarted extends LitElement {

    render() {
        return html`
            <dash-content>
                <h1 class="h3" slot="header">Getting Started</h1>
            </dash-content>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-getting-started', DashGettingStarted);
