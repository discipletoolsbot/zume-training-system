import { html } from 'lit';
import { NavLink } from './nav-link'

export class ListLink extends NavLink {
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
            <div class="container-inline">
                <div
                    class="dash-menu__list-item"
                    data-locked=${this.printBool(this.locked)}
                    data-completed=${this.printBool(this.completed)}
                >
                    <div class="dash-menu__icon-area | stack--5">
                        <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                    </div>
                    <div class="dash-menu__text-area | switcher | switcher-width-20">
                        <div>
                            <h3 class="f-1 bold uppercase">${this.text}</h3>
                            <p>${this.explanation}</p>
                        </div>
                        ${
                            this.completed
                            ? html`
                                <div class="grow-0"><span class="icon zume-check-mark grow-0 | dash-menu__list-success"></span></div>
                            `
                            : html`
                                <a
                                    href=${this.href}
                                    class="dash-menu__view-button btn ${this.locked ? 'locked' : 'light'} tight"
                                    role="button"
                                    @click=${this.handleClick}
                                >
                                    ${
                                        this.locked
                                            ? jsObject.translations.preview
                                            : this.disableNavigate ? this.text : jsObject.translations.view_now
                                    }
                                </a>
                            `
                        }
                    </div>
                </div>
            </div>
        `
    }
}
customElements.define('list-link', ListLink);
