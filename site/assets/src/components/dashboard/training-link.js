import { html } from 'lit';
import { NavLink } from './nav-link'

export class TrainingLink extends NavLink {
    constructor() {
        super()
    }

    render() {
        return html`
            <div
                class="dash-menu__training-item"
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
                ?data-button=${this.disableNavigate}
                role="button"
                @click=${this.handleClick}
            >
                <h3 class="title">${this.text}</h3>
            </div>
        `
    }
}
customElements.define('training-link', TrainingLink);
