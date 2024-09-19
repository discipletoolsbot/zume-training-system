import { LitElement, html } from 'lit';

export class HostProgressBar extends LitElement {
    static get properties() {
        return {
            host: { type: Object },
            hostProgressList: { type: Object },
        };
    }

    toggleHost(host, additionalHostToCredit = []) {
        this.dispatchEvent(new CustomEvent( 'host:toggle', { detail: {
            host,
            additionalHostToCredit,
        } } ))
    }

    render() {
        return html`
            <div class="training-progress">
                <button
                    data-subtype=${this.host[0].subtype}
                    class=${this.hostProgressList[this.host[0].key] ? 'active' : ''}
                    @click=${() => this.toggleHost(this.host[0])}
                >
                    <span class="icon z-icon-heard-concept"></span>
                </button>
                <button
                    data-subtype=${this.host[1].subtype}
                    class=${this.hostProgressList[this.host[1].key] ? 'active' : ''}
                    @click=${() => this.toggleHost(this.host[1], [ this.host[0] ])}
                >
                    <span class="icon z-icon-obey-concept"></span>
                </button>
                <button
                    data-subtype=${this.host[2].subtype}
                    class=${this.hostProgressList[this.host[2].key] ? 'active' : ''}
                    @click=${() => this.toggleHost(this.host[2], [ this.host[0], this.host[1] ])}
                >
                    <span class="icon z-icon-share-concept"></span>
                </button>
                <button
                    data-subtype=${this.host[3].subtype}
                    class=${this.hostProgressList[this.host[3].key] ? 'active' : ''}
                    @click=${() => this.toggleHost(this.host[3], [ this.host[0], this.host[1], this.host[2] ])}
                >
                    <span class="icon z-icon-train-concept"></span>
                </button>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('host-progress-bar', HostProgressBar);
