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

    getIcon() {
        return this.locked ? this.icon + '-locked' : this.icon
    }

    render() {
        return html`
            <a
                href=${this.href}
                class="card-btn grid-link"
                role="button"
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.locked)}
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
            >
                <span class="icon ${this.getIcon()} brand-light"></span>
                ${this.renderText()}
            </a>
        `;
    }
}
customElements.define('grid-link', GridLink);
