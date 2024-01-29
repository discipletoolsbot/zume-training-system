import { LitElement, html } from 'lit';
import { router } from 'lit-element-router';

/**
 * This highest level of the dashboard should mostly be focussed on the routing
 * for the main area and the title area.
 *
 * The sidebar should react to the state of their journey as well as indicate where they currently are.
 *
 * The secondary area should have the correct CTA for either their journey or their current page.
 */
export class DashBoard extends router(LitElement) {
    static get properties() {
        return {
            route: { type: String },
            params: { type: Object },
            query: { type: Object },
        };
    }

    static get routes() {
        return [
            {
                name: 'getting-started',
                pattern: `${zumeDashboard.base_url}/getting-started`,
                data: {
                    component: 'dash-getting-started',
                },
            },
            {
                name: 'training',
                pattern: `${zumeDashboard.base_url}/training`,
                data: {
                    component: 'dash-training',
                },
            },
            {
                name: 'practicing',
                pattern: `${zumeDashboard.base_url}/practicing`,
                data: {
                    component: 'dash-practicing',
                },
            },
            {
                name: 'my-coach',
                pattern: `${zumeDashboard.base_url}/my-coach`,
                data: {
                    component: 'dash-coach',
                },
            },
            {
                name: 'my-tools',
                pattern: `${zumeDashboard.base_url}/my-tools`,
                data: {
                    component: 'dash-tools',
                },
            },
            {
                name: 'my-plans',
                pattern: `${zumeDashboard.base_url}/my-plans`,
                data: {
                    component: 'dash-plans',
                },
            },
            {
                name: 'my-churches',
                pattern: `${zumeDashboard.base_url}/my-churches`,
                data: {
                    component: 'dash-churches',
                },
            },
            {
                name: 'my-maps',
                pattern: `${zumeDashboard.base_url}/my-maps`,
                data: {
                    component: 'dash-maps',
                },
            },
            {
                name: 'not-found',
                pattern: '*',
                data: {
                    component: 'dash-not-found',
                },
            }
        ]
    }

    constructor() {
        super()
        this.route = ''
        this.params = {}
        this.query = {}
        this.data = {}

        this.addEventListener('route', (event) => {
            console.log(event)
        })
    }

    router(route, params, query, data) {
        this.route = route
        this.params = params
        this.query = query
        this.data = data
    }

    makeHref(slug) {
        return `${zumeDashboard.base_url}/${slug}`
    }

    makeHrefRoute(routeName) {
        const routes = DashBoard.routes

        const route = routes.find(({name}) => name === routeName)

        if (!route) {
            console.error('MISSING ROUTE', routeName)
            return ''
        }

        return route.pattern
    }

    renderRoute() {
        const { component } = this.data

        if ( !component ) {
            return ''
        }

        const element = document.createElement(component)
        return element
    }

    render() {
        return html`
            <div class="dashboard">

            <div class="dashboard__sidebar">
                <ul class="stack-2 | progress-menu accordion-menu" data-accordion-menu data-submenu-toggle="true">
                    <li class="menu-section">
                        <nav-link
                            href=${this.makeHref('getting-started')}
                            class="menu-section__title menu-btn"
                            icon="zume-start"
                            text=${zumeDashboard.translations.getting_started}>
                        </nav-link>
                        <progress-circle percent="66" radius="12"></progress-circle>

                        <ul class="nested is-active">
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${zumeDashboard.urls.set_profile_wizard}
                                    ?disabled=${true}
                                    ?completed=${true}
                                    ?directLink=${true}
                                    icon="zume-profile"
                                    text=${zumeDashboard.translations.set_profile}
                                ></nav-link>
                                <span class="icon zume-check-mark success"></span>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${zumeDashboard.urls.plan_training_wizard}
                                    ?disabled=${true}
                                    ?completed=${true}
                                    ?directLink=${true}
                                    icon="zume-start"
                                    text=${zumeDashboard.translations.plan_a_training}
                                ></nav-link>
                                <span class="icon zume-check-mark success"></span>
                            </li>
                            <li>
                                <nav-link
                                    ?directLink=${true}
                                    class="menu-btn"
                                    href=${zumeDashboard.urls.get_coach_wizard}
                                    icon="zume-coach"
                                    text=${zumeDashboard.translations.get_a_coach}
                                ></nav-link>
                                <span class="icon zume-check-mark success"></span>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <nav-link
                            href=${this.makeHref('training')}
                            class="menu-section__title menu-btn"
                            icon="zume-training"
                            text=${zumeDashboard.translations.training}
                        >
                        </nav-link>
                        <ul class="nested is-active">
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href="#"
                                    icon="zume-progress"
                                    text=${zumeDashboard.translations.my_progress}
                                ></nav-link>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href="#"
                                    icon="zume-group"
                                    text=${zumeDashboard.translations.my_training}
                                ></nav-link>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <nav-link
                            href=${this.makeHref('practicing')}
                            class="menu-section__title menu-btn"
                            icon="zume-practicing"
                            text=${zumeDashboard.translations.practicing}
                        ></nav-link>
                        <ul class="nested">
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${this.makeHrefRoute('my-coach')}
                                    icon="zume-coach"
                                    text=${zumeDashboard.translations.my_coach}
                                ></nav-link>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${this.makeHrefRoute('my-tools')}
                                    icon="zume-tools"
                                    text=${zumeDashboard.translations.my_tools}
                                ></nav-link>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${this.makeHrefRoute('my-plans')}
                                    icon="zume-plans"
                                    text=${zumeDashboard.translations.my_plans}
                                ></nav-link>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${this.makeHrefRoute('my-churches')}
                                    icon="zume-churches"
                                    text=${zumeDashboard.translations.my_churches}
                                ></nav-link>
                            </li>
                            <li>
                                <nav-link
                                    class="menu-btn"
                                    href=${this.makeHrefRoute('my-maps')}
                                    icon="zume-location"
                                    text=${zumeDashboard.translations.my_maps}
                                ></nav-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            ${this.renderRoute()}
        </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-board', DashBoard);
