import { html } from 'lit';
import { NavLink } from './nav-link'

export class GridLink extends NavLink {
    constructor() {
        super()
    }

    renderText() {
        return this.text.split(' ').map((word) => html`
            <span>${word}</span>
        `)
    }

    render() {
        return html`
            <a
                href=${this.href}
                class="card-btn grid-link"
                role="button"
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.disabled)}
                data-completed=${this.printBool(this.completed)}
            >
                <span class="icon ${this.icon} brand-light"></span>
                ${this.renderText()}
            </a>
        `;
    }
}
customElements.define('grid-link', GridLink);
