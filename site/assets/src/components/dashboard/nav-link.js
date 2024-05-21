import { LitElement, html } from 'lit';
import { navigator } from 'lit-element-router'

export class NavLink extends navigator(LitElement) {
    static get properties() {
        return {
            href: { type: String },
            class: { type: String },
            locked: { type: Boolean },
            completed: { type: Boolean },
            disableNavigate: { type: Boolean },
            icon: { type: String },
            text: { type: String },
            explanation: { type: String },
        };
    }

    constructor() {
        super()
        this.href = ''
        this.class = ''
        this.icon = ''
        this.text = ''
        this.explanation = ''
        this.locked = false
        this.completed = false
        this.disableNavigate = false
    }

    handleClick(event) {
        if ( !this.disableNavigate ) {
            event.preventDefault()
            this.navigate(this.href)
        }
        event.preventDefault()
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
                aria-disabled=${this.completed}
                ?data-completed=${this.completed}
                ?data-locked=${this.locked}
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
