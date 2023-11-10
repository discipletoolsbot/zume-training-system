import { LitElement, html } from 'lit';

export class CheckinPart extends LitElement {
    static get properties() {
        return {
            part: { type: Object},
        };
    }

    render() {
        console.log(this.part)

        const t = this.part.t ?? null
        const d = this.part.d ?? null
        const info = this.part.info ?? null

        return html`
            ${t !== null ? html`<h3>${t}</h3>` : ''}
            ${d !== null ? html`<p>${d}</p>` : ''}
            ${info !== null ? html`<p>${info}</p>` : ''}

            <div><img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&amp;color=323a68&amp;data=https://zume5.training/zume_app/checkin/?code=5678" width="300px" alt="QR Code"></div>
            <p>
                or <br>
                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=5678" target="_blank">5678</a></strong>
            </p>
        `;
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('checkin-part', CheckinPart);
