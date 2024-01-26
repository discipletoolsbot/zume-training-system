import { LitElement, html } from 'lit';

export class DashNotFound extends LitElement {

    render() {
        return html`
            <dash-content>
                <h1 class="h3" slot="header">Not Found</h1>
            </dash-content>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-not-found', DashNotFound);
