import { LitElement, html } from 'lit';

export class DashPracticing extends LitElement {

    render() {
        return html`
            <dash-content>
                <h1 class="h3" slot="header">Practicing</h1>
            </dash-content>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-practicing', DashPracticing);
