import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { RouteNames } from './routes';

export class DashTrainingsList extends LitElement {
    static get properties() {
        return {
            trainingGroups: { type: Object, attribute: false },
        };
    }

    constructor() {
        super()
        this.trainingGroups = jsObject.training_groups
        this.routeName = RouteNames.myTrainings
        this.route = DashBoard.getRoute(this.routeName)
    }

    makeTrainingHref(code) {
        const routes = DashBoard.routes

        const route = routes.find(({name}) => name === RouteNames.myTraining)

        return route.pattern.replace(':code', code)
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
                    <div class="stack">
                        ${
                            repeat(Object.entries(this.trainingGroups), ([key]) => key, ([key, group]) => html`
                                <training-link
                                    as="nav"
                                    text=${group.title}
                                    href=${this.makeTrainingHref(group.join_key)}
                                ></training-link>
                            `)
                        }
                    </div>
                    </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('dash-trainings-list', DashTrainingsList);
