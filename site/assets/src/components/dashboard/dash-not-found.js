import { LitElement, html } from 'lit';

export class DashNotFound extends LitElement {

    render() {
        return html`<h1 class="h3">Not Found</h1>`;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-not-found', DashNotFound);
