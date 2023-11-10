import { LitElement, html } from 'lit';

export class PartSwitcher extends LitElement {
    static get properties() {
        return {
            part: { type: Object},
        };
    }

    render() {

        console.log(this.part)

       switch (this.part.type) {
            case 'section':
                return html`<section-part .part=${this.part}></section-part>`
            case 'watch':
                return html`<watch-part .part=${this.part}></watch-part>`
            case 'discuss':
                return html`<discuss-part .part=${this.part}></discuss-part>`
            case 'read':
                return html`<read-part .part=${this.part}></read-part>`
            case 'see':
                return html`<see-part .part=${this.part}></see-part>`
            case 'share':
                return html`<share-part .part=${this.part}></share-part>`
            case 'listen':
                return html`<listen-part .part=${this.part}></listen-part>`
            case 'form':
                return html`<form-part .part=${this.part}></form-part>`
            case 'checkin':
                return html`<checkin-part .part=${this.part}></checkin-part>`
            case 'cta':
            default:
                return html`<basic-part .part=${this.part}></basic-part>`
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

