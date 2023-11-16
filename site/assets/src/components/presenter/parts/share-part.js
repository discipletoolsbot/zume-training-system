import { LitElement, html } from 'lit';

export class SharePart extends LitElement {
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
            ${t !== null ? html`<h3>${t}</h3>` : ''}
            ${d !== null ? html`<p>${d}</p>` : ''}
            ${info !== null ? html`<p>${info}</p>` : ''}
        `;
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('share-part', SharePart);
