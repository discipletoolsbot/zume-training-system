import { LitElement, html } from 'lit';

export class PartSwitcher extends LitElement {
    static get properties() {
        return {
            partData: { type: Object},
        };
    }

    render() {

       switch (this.partData.type) {
            case 'section':
                return html`<section-part .partData=${this.partData}></section-part>`
            case 'watch':
                return html`<watch-part .partData=${this.partData}></watch-part>`
            case 'discuss':
                return html`<discuss-part .partData=${this.partData}></discuss-part>`
            case 'read':
                return html`<read-part .partData=${this.partData}></read-part>`
            case 'see':
                return html`<see-part .partData=${this.partData}></see-part>`
            case 'share':
                return html`<share-part .partData=${this.partData}></share-part>`
            case 'listen':
                return html`<listen-part .partData=${this.partData}></listen-part>`
            case 'form':
                return html`<form-part .partData=${this.partData}></form-part>`
            case 'checkin':
                return html`<checkin-part .partData=${this.partData}></checkin-part>`
            case 'cta':
            default:
                return html`<basic-part .partData=${this.partData}></basic-part>`
        }
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('part-switcher', PartSwitcher);

