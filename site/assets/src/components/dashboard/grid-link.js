import { html } from 'lit';
import { NavLink } from './nav-link'

export class GridLink extends NavLink {
    constructor() {
        super()
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
                <span>${this.text}</span>
            </a>
        `;
    }
}
customElements.define('grid-link', GridLink);
