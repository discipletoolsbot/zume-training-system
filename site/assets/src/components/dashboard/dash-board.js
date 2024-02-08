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
            menuOffset: { type: Number, attribute: false },
        };
    }

    static get routes() {
        return [
            {
                name: 'getting-started',
                pattern: `${zumeDashboard.base_url}/getting-started`,
                icon: 'zume-start',
                translation: zumeDashboard.translations['getting_started'],
                data: {
                    component: 'dash-getting-started',
                },
            },
            {
                name: 'training',
                pattern: `${zumeDashboard.base_url}/training`,
                icon: 'zume-training',
                translation: zumeDashboard.translations['training'],
                data: {
                    component: 'dash-training',
                },
            },
            {
                name: 'my-training',
                pattern: `${zumeDashboard.base_url}/my-training`,
                parent: 'training',
                icon: 'zume-group',
                translation: zumeDashboard.translations['my_training'],
                explanation: zumeDashboard.translations['my_training_explanation'],
                data: {
                    component: 'dash-trainings',
                },
            },
            {
                name: 'my-progress',
                pattern: `${zumeDashboard.base_url}/my-progress`,
                parent: 'training',
                icon: 'zume-progress',
                translation: zumeDashboard.translations['my_progress'],
                explanation: zumeDashboard.translations['my_progress_explanation'],
                data: {
                    component: 'dash-progress',
                },
            },
            {
                name: '3-month-plan',
                pattern: `${zumeDashboard.base_url}/3-month-plan`,
                parent: 'training',
                icon: 'zume-plans',
                translation: zumeDashboard.translations['3_month_plan'],
                explanation: zumeDashboard.translations['3_month_plan_explanation'],
                data: {
                    component: 'dash-progress',
                },
            },
            {
                name: 'practicing',
                pattern: `${zumeDashboard.base_url}/practicing`,
                icon: 'zume-practicing',
                translation: zumeDashboard.translations['practicing'],
                data: {
                    component: 'dash-practicing',
                },
            },
            {
                name: 'my-coach',
                pattern: `${zumeDashboard.base_url}/my-coach`,
                parent: 'practicing',
                icon: 'zume-coach',
                translation: zumeDashboard.translations['my_coach'],
                explanation: zumeDashboard.translations['my_coach_explanation'],
                data: {
                    component: 'dash-coach',
                },
            },
            {
                name: 'my-tools',
                pattern: `${zumeDashboard.base_url}/my-tools`,
                parent: 'practicing',
                icon: 'zume-tools',
                translation: zumeDashboard.translations['my_tools'],
                explanation: zumeDashboard.translations['my_tools_explanation'],
                data: {
                    component: 'dash-tools',
                },
            },
            {
                name: 'my-plans',
                pattern: `${zumeDashboard.base_url}/my-plans`,
                parent: 'practicing',
                icon: 'zume-plans',
                translation: zumeDashboard.translations['my_plans'],
                explanation: zumeDashboard.translations['my_plans_explanation'],
                data: {
                    component: 'dash-plans',
                },
            },
            {
                name: 'my-churches',
                pattern: `${zumeDashboard.base_url}/my-churches`,
                parent: 'practicing',
                icon: 'zume-churches',
                translation: zumeDashboard.translations['my_churches'],
                explanation: zumeDashboard.translations['my_churches_explanation'],
                data: {
                    component: 'dash-churches',
                },
            },
            {
                name: 'my-maps',
                pattern: `${zumeDashboard.base_url}/my-maps`,
                parent: 'practicing',
                icon: 'zume-maps',
                translation: zumeDashboard.translations['my_maps'],
                explanation: zumeDashboard.translations['my_maps_explanation'],
                data: {
                    component: 'dash-maps',
                },
            },
            {
                name: 'not-found',
                pattern: '*',
                icon: '',
                data: {
                    component: 'dash-not-found',
                },
            }
        ]
    }

    static getRoute(name) {
        const routes = DashBoard.routes
        return routes.find((route) => route.name === name)
    }

    static childRoutesOf(parentName) {
        const routes = DashBoard.routes

        return routes.filter(({parent}) => parent === parentName)
    }

    constructor() {
        super()
        this.route = ''
        this.params = {}
        this.query = {}
        this.data = {}
        this.menuOffset = 0

        this.addEventListener('route', (event) => {
            console.log(event)
        })
    }

    firstUpdated() {
        const progressMenu = this.querySelector('.progress-menu')
        const offsetTop = progressMenu.offsetTop
        this.menuOffset = offsetTop
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
                <ul
                    class="stack-2 | progress-menu accordion-menu"
                    data-accordion-menu
                    data-submenu-toggle="true"
                    style="top: ${this.menuOffset}px"
                >
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
                            ${
                                DashBoard.childRoutesOf('training')
                                    .map((route) => html`
                                        <li>
                                            <nav-link
                                                class="menu-btn"
                                                href=${this.makeHrefRoute(route.name)}
                                                icon=${route.icon}
                                                text=${route.translation}
                                                ?locked=${['3-month-plan'].includes(route.name)}
                                            ></nav-link>
                                            <span class="icon zume-locked gray-500"></span>
                                        </li>
                                    `)
                            }
                        </ul>
                    </li>
                    <li class="menu-section">
                        <nav-link
                            href=${this.makeHref('practicing')}
                            class="menu-section__title menu-btn"
                            icon="zume-practicing"
                            text=${zumeDashboard.translations.practicing}
                        ></nav-link>
                        <ul class="nested is-active">
                            ${
                                DashBoard.childRoutesOf('practicing')
                                    .map((route) => html`
                                        <li>
                                            <nav-link
                                                class="menu-btn"
                                                href=${this.makeHrefRoute(route.name)}
                                                icon=${route.icon}
                                                text=${route.translation}
                                                ?locked=${['my-plans', 'my-churches', 'my-maps'].includes(route.name)}
                                            ></nav-link>
                                            <span class="icon zume-locked gray-500"></span>
                                        </li>
                                    `)
                            }
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
