import { html } from 'lit';
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';
import { RouteNames } from './routes';
import { zumeRequest } from '../../js/zumeRequest';

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
        zumeRequest.get( 'user_stage', {}).then( ( data ) => {
            if (!data || !data.state) {
                console.error('Stage or state data not returned from api')
            }
            jsObject.user_stage = data
            this.userState = data.state
        })
    }

    renderLinks(userState) {
        return html`
            <div class="${this.view === 'grid' ? 'nav-grid' : 'stack'}">
                ${
                    this.routes.map((route) => {
                        let href = route.pattern

                        const trainingGroupIds = Object.keys(jsObject.training_groups)

                        if (route.name === RouteNames.myTraining) {
                            if (trainingGroupIds.length === 0) {
                                href = route.pattern.replace(':code', 'teaser')
                            } else if (trainingGroupIds.length > 0) {
                                const route = DashBoard.getRoute(RouteNames.myTrainings)

                                href = route.pattern
                            }
                        }

                        let routeName = route.translation
                        if (Object.keys(jsObject.training_groups).length > 1 && route.name === RouteNames.myTraining) {
                            routeName = jsObject.translations.my_trainings
                        }

                        if (this.view === 'grid') {
                            return html`
                                <grid-link
                                    href=${href}
                                    text=${routeName}
                                    icon=${route.icon}
                                    ?disableNavigate=${route.type === 'handled-link'}
                                    as=${route.type === 'handled-link' ? 'link' : 'nav'}
                                    @click=${route.type === 'handled-link' ? (event) => {
                                        if (!route.data.neverDisabled && DashBoard.getCompletedStatus(route.name, userState)) return
                                        route.clickHandler(event, this.dispatchEvent)
                                    } : null}
                                    ?completed=${DashBoard.getCompletedStatus(route.name, userState)}
                                    ?locked=${DashBoard.getLockedStatus(route.name, userState)}
                                >
                                </grid-link>
                            `
                        } else {
                            return html`
                               <list-link
                                    href=${href}
                                    text=${routeName}
                                    explanation=${route.explanation}
                                    icon=${route.icon}
                                    ?disableNavigate=${route.type === 'handled-link'}
                                    as=${route.type === 'handled-link' ? 'link' : 'nav'}
                                    @click=${route.type === 'handled-link' ? (event) => {
                                        if (!route.data.neverDisabled && DashBoard.getCompletedStatus(route.name, userState)) return
                                        route.clickHandler(event, this.dispatchEvent)
                                    } : null}
                                    ?completed=${DashBoard.getCompletedStatus(route.name, userState)}
                                    ?locked=${DashBoard.getLockedStatus(route.name, userState)}
                                >
                                </list-link>
                            `
                        }
                    })
                }
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
                            <span class="icon z-icon-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view === 'grid' ? 'selected' : ''}" title=${jsObject.translations.grid} @click=${() => this.switchView('grid')}>
                            <span class="icon z-icon-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-1">
                    ${this.renderLinks(this.userState)}
                </div>
                <div class="dashboard__secondary">
                    ${
                        this.routeName === 'getting-started'
                            ? ''
                            : html`<dash-cta></dash-cta>`
                    }
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-top-level', DashTopLevel);
