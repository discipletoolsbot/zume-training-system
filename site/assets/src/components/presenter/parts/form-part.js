import { LitElement, html } from 'lit';

export class FormPart extends LitElement {
    static get properties() {
        return {
            partData: { type: Object},
        };
    }

    render() {
        const t = this.partData.t ?? null
        const d = this.partData.d ?? null
        const info = this.partData.info ?? null

        return html`
            ${this.title !== null ? html`<h2>${this.title}</h2>` : ''}
            ${this.description !== null ? html`<p>${this.description}</p>` : ''}
            ${this.info !== null ? html`<p>${this.info}</p>` : ''}
        `;
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('form-part', FormPart);
