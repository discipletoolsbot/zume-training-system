import { LitElement, html } from 'lit';
import { router } from 'lit-element-router';
import { dashRoutes } from './dash-routes';

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
        const redirectRoutes = {
            1: 'dash-getting-started',
            2: 'dash-training',
            3: 'dash-practicing',
        }
        const userStage = zumeDashboard.user_stage.value || 1
        const redirectRouteIndex = userStage < 4 ? userStage : 3;

        /* Setup the route of the /dashboard url to point to the appropriate landing stage of the user */
        const routes = dashRoutes().map((route) => {
            if ( route.name === 'root' ) {
                route.data.component = redirectRoutes[redirectRouteIndex]
            }

            return route
        })

        return routes
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
        this.userState = zumeDashboard.user_stage.state

        this.addEventListener('toggle-dashboard-sidebar', () => {
            this.toggleSidebar()
        })
    }

    firstUpdated() {
        this.menuOffset = this.getOffsetTop('.sidebar-wrapper')
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

    getOffsetTop(querySelector) {
        const element = this.querySelector(querySelector)
        const offsetTop = element.offsetTop
        return offsetTop
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.dashboard__sidebar')
        const backgroundTrigger = document.querySelector('.sidebar__trigger-close-background')
        const transitionDuration = '200'

        sidebar.style.transitionDuration = transitionDuration
        backgroundTrigger.style.transitionDuration = transitionDuration

        const state = sidebar.dataset.state

        if ( state === 'open' ) {
            sidebar.dataset.state = 'closed'
            backgroundTrigger.style.opacity = 0
            setTimeout(() => {
                backgroundTrigger.style.visibility = 'hidden'
            }, transitionDuration)
        }
        if ( !state || state === 'closed' ) {
            sidebar.dataset.state = 'open'
            backgroundTrigger.style.opacity = 'initial'
            backgroundTrigger.style.visibility = 'visible'
        }
    }

    static getCompletedStatus(routeName) {
        const userState = zumeDashboard.user_stage.state
        if (routeName === 'set-profile' && userState.set_profile) {
            return true
        }
        if (routeName === 'get-a-coach' && userState.requested_a_coach) {
            return true
        }
        if (routeName === 'plan-a-training' && ( userState.plan_created || userState.joined_online_training )) {
            return true
        }
        return false
    }

    static getLockedStatus(routeName) {
        const userState = zumeDashboard.user_stage.state
        if (routeName === 'my-plans' && !userState.made_3_month_plan) {
            return true
        }
        if (['my-churches', 'my-maps'].includes(routeName) && !userState.join_community) {
            return true
        }
        if (routeName === '3-month-plan' && !userState.can_create_3_month_plan) {
            return true
        }
        return false
    }

    getGettingStartedPercentage() {
        const itemsToComplete = ['get-a-coach', 'set-profile', 'plan-a-training'];

        const numberCompleted = itemsToComplete.reduce((total, item) => {
            if (DashBoard.getCompletedStatus(item)) {
                return total + 1
            }
            return total
        }, 0)

        return Math.round( numberCompleted / itemsToComplete.length * 100 )
    }

    render() {
        return html`
            <div class="sidebar__trigger-close-background" @click=${this.toggleSidebar}></div>
            <div class="dashboard">

            <div class="dashboard__sidebar">
                <div
                    class="sidebar-wrapper"
                    style="top: ${this.menuOffset}px; height: calc( min( 100%, 100vh ) - ${this.menuOffset}px - var(--s0) );"
                >
                    <button
                        class="ms-auto mb-0 d-block w-2rem dashboard__sidebar-toggle break-large break-medium"
                        aria-label="Close modal"
                        type="button"
                        @click=${this.toggleSidebar}
                    >
                        <img src=${zumeDashboard.images_url + '/close-button-01.svg'} alt="close button">
                    </button>
                    <ul
                        class="stack-2 | progress-menu accordion-menu"
                        data-accordion-menu
                        data-submenu-toggle="true"
                    >
                        <li class="menu-section">
                            <nav-link
                                href=${this.makeHref('getting-started')}
                                class="menu-section__title menu-btn"
                                icon="zume-start"
                                text=${zumeDashboard.translations.getting_started}>
                            </nav-link>
                            <progress-circle percent=${this.getGettingStartedPercentage()} radius="12"></progress-circle>
                            <ul class="nested is-active">
                                ${
                                    DashBoard.childRoutesOf('getting-started')
                                        .map((route) => html`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(route.name)}
                                                    icon=${route.icon}
                                                    text=${route.translation}
                                                    ?directLink=${route.type === 'direct-link'}
                                                    ?completed=${DashBoard.getCompletedStatus(route.name)}
                                                ></nav-link>
                                                <span class="icon zume-check-mark success"></span>
                                            </li>
                                        `)
                                }
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
                                                    ?locked=${DashBoard.getLockedStatus(route.name)}
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
                                                    ?locked=${DashBoard.getLockedStatus(route.name)}
                                                ></nav-link>
                                                <span class="icon zume-locked gray-500"></span>
                                            </li>
                                        `)
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
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
