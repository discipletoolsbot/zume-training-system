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
            userProfile: { type: Object, attribute: false },
            userState: { type: Object, attribute: false },
            wizardType: { type: String, attribute: false },
        };
    }

    static get routes() {
        const redirectRoutes = {
            1: 'getting-started',
            2: 'training',
            3: 'practicing',
        }
        const userStage = jsObject.user_stage.value || 1
        const redirectRouteIndex = userStage < 4 ? userStage : 3;

        const redirectRoute = dashRoutes().find(({ name }) => name === redirectRoutes[redirectRouteIndex])
        const { makeComponent } = redirectRoute.data

        /* Setup the route of the /dashboard url to point to the appropriate landing stage of the user */
        const routes = dashRoutes().map((route) => {
            if ( route.name === 'root' ) {
                route.data = { makeComponent }
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
        this.userProfile = jsObject.profile
        this.userState = jsObject.user_stage.state
        this.wizardType = ''

        this.updateUserProfile = this.updateUserProfile.bind(this)
        this.updateWizardType = this.updateWizardType.bind(this)
        this.refetchState = this.refetchState.bind(this)
        this.refetchHost = this.refetchHost.bind(this)
    }

    connectedCallback() {
        super.connectedCallback()

        window.addEventListener('user-profile:change', this.updateUserProfile)
        window.addEventListener('toggle-dashboard-sidebar', this.toggleSidebar)
        window.addEventListener('open-wizard', this.updateWizardType)
        window.addEventListener('wizard-finished', this.closeWizard)
        window.addEventListener('user-state:change', this.refetchState)
        window.addEventListener('user-host:change', this.refetchHost)
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        window.removeEventListener('user-profile:change', this.updateUserProfile)
        window.removeEventListener('toggle-dashboard-sidebar', this.toggleSidebar)
        window.removeEventListener('open-wizard', this.updateWizardType)
        window.removeEventListener('wizard-finished', this.closeWizard)
        window.removeEventListener('user-host:change', this.refetchHost)
    }

    firstUpdated() {
        this.menuOffset = this.getOffsetTop('.sidebar-wrapper')
    }

    updateWizardType(event) {
        const type = event.detail.type
        this.openWizard(type)
    }

    router(route, params, query, data) {
        this.route = route
        this.params = params
        this.query = query
        this.data = data
    }

    makeHref(slug) {
        return `${jsObject.base_url}/${slug}`
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
        const { makeComponent } = this.data

        if ( !makeComponent ) {
            return ''
        }

        const isLocked = DashBoard.getLockedStatus(this.route, this.userState)

        const element = makeComponent(isLocked)

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

    updateUserProfile(event) {
        const newProfile = event.detail
        this.userProfile = newProfile
    }

    createInitials(name) {
        if (typeof name !== 'string' || name.length === 0) {
            return ''
        }
        const initials = name.split(' ').map((text) => text.length > 0 ? text[0].toUpperCase() : '').slice(0,2).join('')
        return initials
    }

    static getCompletedStatus(routeName, userState) {
        if (routeName === 'set-profile' && userState.set_profile_location && userState.set_profile_name) {
            return true
        }
        if (routeName === 'get-a-coach' && userState.requested_a_coach) {
            return true
        }
        if (routeName === 'join-a-training' && ( userState.plan_created || userState.joined_online_training )) {
            return true
        }
        return false
    }

    static getLockedStatus(routeName, userState) {
        if (routeName === 'my-plans' && !userState.made_3_month_plan) {
            return true
        }
        if (['my-churches', 'my-maps'].includes(routeName) && !userState.join_community) {
            return true
        }
        if (routeName === '3-month-plan' && !userState.can_create_3_month_plan) {
            return true
        }
        if (routeName === 'my-training' && !userState.plan_created && !userState.joined_online_training ) {
            return true
        }
        return false
    }

    getGettingStartedPercentage() {
        const itemsToComplete = ['get-a-coach', 'set-profile', 'join-a-training'];

        const numberCompleted = itemsToComplete.reduce((total, item) => {
            if (DashBoard.getCompletedStatus(item, this.userState)) {
                return total + 1
            }
            return total
        }, 0)

        return Math.round( numberCompleted / itemsToComplete.length * 100 )
    }

    openWizard(type) {
        const modal = document.querySelector('#wizard-modal')
        jQuery(modal).foundation('open')
        this.wizardType = type
    }
    closeWizard() {
        this.wizardType = ''
        const modal = document.querySelector('#wizard-modal')
        jQuery(modal).foundation('close')
    }
    refetchState() {
        console.log('refetching state')
        makeRequest('GET', 'user_stage', {}, 'zume_system/v1' ).done( ( data ) => {
            if (!data || !data.state) {
                console.error('Stage or state data not returned from api')
            }
            jsObject.user_stage = data
            this.userState = data.state
        })
    }
    refetchHost() {
        console.log('refetching host')
        makeRequest('GET', 'user_host', {}, 'zume_system/v1' ).done( ( data ) => {
            if (!data) {
                console.error('Host not returned from api')
            }
            jsObject.host_progress = data
        })
    }

    openProfile() {
        const modal = document.querySelector('#profile-modal')
        jQuery(modal).foundation('open')
    }
    closeProfile() {
        const modal = document.querySelector('#profile-modal')
        jQuery(modal).foundation('close')
    }

    openCommunityModal(event) {
        event.preventDefault()
        const modal = document.querySelector('#community-modal')
        jQuery(modal).foundation('open')
    }
    closeCommunityModal() {
        const modal = document.querySelector('#community-modal')
        jQuery(modal).foundation('close')
    }

    joinCommunity() {
        makeRequest('POST', 'log', { type: 'system', subtype: 'join_community' }, 'zume_system/v1/' ).done( ( data ) => {
            this.refetchState()
        })
    }
    hasJoinedCommunity() {
        return this.userState.join_community ? true : false
    }

    openResourcesModal(event) {
        event.preventDefault()
        const modal = document.querySelector('#resources-modal')
        jQuery(modal).foundation('open')
    }
    closeResourcesModal() {
        const modal = document.querySelector('#resources-modal')
        jQuery(modal).foundation('close')
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
                            class="ms-auto d-block w-2rem dashboard__sidebar-toggle break-large break-medium"
                            aria-label="Close modal"
                            type="button"
                            @click=${this.toggleSidebar}
                        >
                            <span class="icon zume-close gray-500"></span>
                        </button>
                        <div class="profile-area">
                            <button
                                class="profile-btn"
                                @click=${this.openProfile}
                            >
                                ${this.createInitials(this.userProfile.name)}
                            </button>
                            <span class="profile-name">${this.userProfile.name}</span>
                        </div>
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
                                    text=${jsObject.translations.getting_started}>
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
                                                        ?disableNavigate=${route.type === 'handled-link'}
                                                        @click=${route.type === 'handled-link' ? (event) => {
                                                            if (DashBoard.getCompletedStatus(route.name, this.userState)) return
                                                            route.clickHandler(event, this.dispatchEvent)
                                                        } : null}
                                                        ?completed=${DashBoard.getCompletedStatus(route.name, this.userState)}
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
                                    text=${jsObject.translations.training}
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
                                                        ?locked=${DashBoard.getLockedStatus(route.name, this.userState)}
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
                                    text=${jsObject.translations.practicing}
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
                                                        ?locked=${DashBoard.getLockedStatus(route.name, this.userState)}
                                                    ></nav-link>
                                                    <span class="icon zume-locked gray-500"></span>
                                                </li>
                                            `)
                                    }
                                </ul>
                            </li>
                        </ul>
                        <div class="footer-links">
                            <nav-link
                                class="menu-btn | f--1"
                                href=''
                                icon='zume-community'
                                text=${this.hasJoinedCommunity() ? jsObject.translations.community : jsObject.translations.join_the_community}
                                ?disableNavigate=${true}
                                @click=${this.openCommunityModal}
                            ></nav-link>
                            <nav-link
                                class="menu-btn | f--1"
                                href=''
                                icon='zume-resources'
                                text=${jsObject.translations.resources}
                                ?disableNavigate=${true}
                                @click=${this.openResourcesModal}
                            ></nav-link>
                        </div>
                    </div>
                </div>

                ${this.renderRoute()}
            </div>
            <div class="reveal full" id="profile-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeProfile}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <div class="container-xsm my-0">
                    <h3>${jsObject.translations.edit_profile}</h3>
                    <profile-form .userProfile=${this.userProfile}></profile-form>
                    <a href=${jsObject.urls.logout} class="btn outline">${jsObject.translations.logout}</a>
                </div>
            </div>
            <div class="reveal full" id="wizard-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeWizard}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <zume-wizard
                    type=${this.wizardType}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
            </div>
            <div class="reveal full" id="resources-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeResourcesModal}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <div class="container-xsm">
                    <h1>Resources</h1>
                    <p>All the resources</p>
                    <ul role="list">
                        <li>in a</li>
                        <li>great big</li>
                        <li>list</li>
                    </ul>
                </div>
            </div>
            <div class="reveal full" id="community-modal" data-reveal>
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button" @click=${this.closeCommunityModal}>
                    <span class="icon zume-close gray-500"></span>
                </button>
                <div class="container-xsm">
                    <h1>Practitioner Community</h1>
                    ${
                        this.hasJoinedCommunity() ? html`
                            <p>Here is all the community stuff we promised you :)</p>
                        `
                        : html`
                            <p>There are lot's of good reasons to join the community here</p>
                            <button class="btn" @click=${this.joinCommunity}>
                                Join
                            </button>
                        `
                    }
                </div>

            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-board', DashBoard);
