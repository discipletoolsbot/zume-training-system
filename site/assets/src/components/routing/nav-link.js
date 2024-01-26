import { LitElement, html } from 'lit';
import { navigator } from 'lit-element-router'

export class NavLink extends navigator(LitElement) {
    static get properties() {
        return {
            href: { type: String },
            class: { type: String },
            disabled: { type: Boolean },
            completed: { type: Boolean },
            icon: { type: String },
            text: { type: String },
        };
    }

    constructor() {
        super()
        this.href = ''
        this.class = ''
        this.icon = ''
        this.text = ''
        this.disabled = false
        this.completed = false
    }

    handleClick(event) {
        event.preventDefault()
        this.navigate(this.href)
    }

    printBool(bool) {
        return bool ? 'true' : 'false'
    }

    render() {
        return html`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.disabled)}
                data-completed=${this.printBool(this.completed)}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('nav-link', NavLink);
