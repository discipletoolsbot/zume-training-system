import { LitElement, html } from 'lit';

export class DashTraining extends LitElement {

    render() {
        return html`<h1 class="h3">Training</h1>`;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-training', DashTraining);
