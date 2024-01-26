import { LitElement, html } from 'lit';

export class DashGettingStarted extends LitElement {

    render() {
        return html`<h1 class="h3">Getting Started</h1>`;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-getting-started', DashGettingStarted);
