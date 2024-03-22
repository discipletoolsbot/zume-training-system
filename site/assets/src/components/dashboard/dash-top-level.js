import { html } from 'lit';
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';

export class DashTopLevel extends DashPage {
    static get properties() {
        return {
            view: { type: String, attribute: false },
            userState: { type: Object, attribute: false },
        };
    }

    constructor(routeName) {
        super()
        this.routeName = routeName
        this.route = DashBoard.getRoute(this.routeName)
        this.routes = DashBoard.childRoutesOf(this.routeName)
        this.view = 'list'
        this.userState = jsObject.user_stage.state

        this.refetchState = this.refetchState.bind(this)
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('user-state:change', this.refetchState)
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('user-state:change', this.refetchState)
    }

    switchView(view = 'list') {
        this.view = view
    }
    refetchState() {
        makeRequest('GET', 'user_stage', {}, 'zume_system/v1' ).done( ( data ) => {
            console.log(this, data)
            if (!data || !data.state) {
                console.error('Stage or state data not returned from api')
            }
            jsObject.user_stage = data
            this.userState = data.state
        })
    }

    renderLinks(userState) {
        if ( this.view === 'grid' ) {
            return html`
                <div class="nav-grid">
                    ${this.routes.map((route) => html`
                        <grid-link
                            href=${route.pattern}
                            text=${route.translation || ''}
                            icon=${route.icon}
                            ?disableNavigate=${route.type === 'handled-link'}
                            @click=${route.type === 'handled-link' ? (event) => {
                                if (DashBoard.getCompletedStatus(route.name, userState)) return
                                route.clickHandler(event, this.dispatchEvent)
                            } : null}
                            ?completed=${DashBoard.getCompletedStatus(route.name, userState)}
                            ?locked=${DashBoard.getLockedStatus(route.name, userState)}
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
                        ?disableNavigate=${route.type === 'handled-link'}
                        @click=${route.type === 'handled-link' ? (event) => {
                            if (DashBoard.getCompletedStatus(route.name, userState)) return
                            route.clickHandler(event, this.dispatchEvent)
                        } : null}
                        ?completed=${DashBoard.getCompletedStatus(route.name, userState)}
                        ?locked=${DashBoard.getLockedStatus(route.name, userState)}
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
                        <button class="${this.view === 'list' ? 'selected' : ''}" title=${jsObject.translations.list} @click=${() => this.switchView('list')}>
                            <span class="icon zume-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view === 'grid' ? 'selected' : ''}" title=${jsObject.translations.grid} @click=${() => this.switchView('grid')}>
                            <span class="icon zume-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-2">
                    ${this.renderLinks(this.userState)}
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
