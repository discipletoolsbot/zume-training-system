import { LitElement, html } from 'lit';

export class DashPracticing extends LitElement {

    render() {
        return html`<h1 class="h3">Practicing</h1>`;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-practicing', DashPracticing);
