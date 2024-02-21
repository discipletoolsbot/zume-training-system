import { html } from 'lit';
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';

export class DashTopLevel extends DashPage {
    static get properties() {
        return {
            view: { type: String, attribute: false },
        };
    }

    constructor(routeName) {
        super()
        this.routeName = routeName
        this.route = DashBoard.getRoute(this.routeName)
        this.routes = DashBoard.childRoutesOf(this.routeName)
        this.view = 'list'
    }

    switchView(view = 'list') {
        this.view = view
    }

    renderLinks() {
        if ( this.view === 'grid' ) {
            return html`
                <div class="nav-grid">
                    ${this.routes.map((route) => html`
                        <grid-link
                            href=${route.pattern}
                            text=${route.translation || ''}
                            icon=${route.icon}
                            ?locked=${['my-plans', 'my-churches', 'my-maps'].includes(route.name)}
                        >
                        </grid-link>
                        `
                    )}
                </div>
            `
        }

        return html`
            <div class="stack-3">
                ${this.routes.map((route) => html`
                    <list-link
                        href=${route.pattern}
                        text=${route.translation}
                        explanation=${route.explanation}
                        icon=${route.icon}
                        ?locked=${['my-plans', 'my-churches', 'my-maps'].includes(route.name)}
                    >
                    </list-link>
                `)}
            </div>
        `
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="icon-btn-group">
                        <button class="${this.view === 'list' ? 'selected' : ''}" title=${zumeDashboard.translations.list} @click=${() => this.switchView('list')}>
                            <span class="icon zume-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view === 'grid' ? 'selected' : ''}" title=${zumeDashboard.translations.grid} @click=${() => this.switchView('grid')}>
                            <span class="icon zume-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-2">
                    ${this.renderLinks()}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-top-level', DashTopLevel);
