import { LitElement, html } from 'lit';

export class JoinTraining extends LitElement {

    render() {
        return html`
            <h1>Joining Plan</h1>
            <p>Please wait while we connect you <span class="loading-spinner active"></span></p>
            <p>Successfully joined plan</p>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-training', JoinTraining);
