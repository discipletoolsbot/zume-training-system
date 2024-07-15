import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { RouteNames } from './routes';
import { Wizards } from '../wizard/wizard-constants';

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
    createTraining() {
        this.dispatchEvent(new CustomEvent( 'open-wizard', { bubbles: true, detail: { type: Wizards.makeAGroup } } ))
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
                    <div class="">
                        <button
                            class="icon-btn f-2 brand-light"
                            aria-label=${jsObject.translations.create_training_group}
                            @click=${this.createTraining}
                        >
                            <span class="icon z-icon-plus"></span>
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
