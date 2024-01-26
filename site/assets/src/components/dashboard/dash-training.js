import { LitElement, html } from 'lit';

export class DashTraining extends LitElement {

    render() {
        return html`
            <dash-content>
                <h1 class="h3" slot="header">Training</h1>
            </dash-content>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-training', DashTraining);
