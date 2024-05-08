import { LitElement, html } from 'lit';
import { navigator, router } from 'lit-element-router';
import { dashRoutes } from './dash-routes';

/**
 * This highest level of the dashboard should mostly be focussed on the routing
 * for the main area and the title area.
 *
 * The sidebar should react to the state of their journey as well as indicate where they currently are.
 *
 * The secondary area should have the correct CTA for either their journey or their current page.
 */
export class DashBoard extends navigator(router(LitElement)) {
    static get properties() {
        return {
            route: { type: String },
            params: { type: Object },
            query: { type: Object },
            menuOffset: { type: Number, attribute: false },
            userProfile: { type: Object, attribute: false },
            userState: { type: Object, attribute: false },
            wizardType: { type: String, attribute: false },
            celbrationModalContent: { type: Object, attribute: false },
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
        this.celebrationModalContent = {
            title: '',
            content: [],
        }

        this.allCtas = []
        this.ctas = []
        this.userId = jsObject.profile.user_id
        this.showingCelebrationModal = false

        this.languageSelectorElements = document.querySelectorAll('.language-selector')

        this.updateUserProfile = this.updateUserProfile.bind(this)
        this.updateWizardType = this.updateWizardType.bind(this)
        this.refetchState = this.refetchState.bind(this)
        this.refetchHost = this.refetchHost.bind(this)
        this.getCtas = this.getCtas.bind(this)
        this.showCelebrationModal = this.showCelebrationModal.bind(this)
    }

    connectedCallback() {
        super.connectedCallback()

        window.addEventListener('user-profile:change', this.updateUserProfile)
        window.addEventListener('toggle-dashboard-sidebar', this.toggleSidebar)
        window.addEventListener('open-wizard', this.updateWizardType)
        window.addEventListener('wizard-finished', this.closeWizard)
        window.addEventListener('wizard-finished', this.getCtas)
        window.addEventListener('open-3-month-plan', this.open3MonthPlan)
        window.addEventListener('user-state:change', this.refetchState)
        window.addEventListener('user-state:change', this.getCtas)
        window.addEventListener('user-host:change', this.refetchHost)

        window.addEventListener('load', this.showCelebrationModal)
        window.addEventListener('ctas:changed', this.showCelebrationModal)

        this.addEventListener('route', this.updateLanguageSwitcher)
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        window.removeEventListener('user-profile:change', this.updateUserProfile)
        window.removeEventListener('toggle-dashboard-sidebar', this.toggleSidebar)
        window.removeEventListener('open-wizard', this.updateWizardType)
        window.removeEventListener('wizard-finished', this.closeWizard)
        window.removeEventListener('wizard-finished', this.getCtas)
        window.removeEventListener('open-3-month-plan', this.open3MonthPlan)
        window.removeEventListener('user-state:change', this.refetchState)
        window.removeEventListener('user-state:change', this.getCtas)
        window.removeEventListener('user-host:change', this.refetchHost)

        window.removeEventListener('load', this.showCelebrationModal)
        window.removeEventListener('ctas:changed', this.showCelebrationModal)

        this.removeEventListener('route', this.updateLanguageSwitcher)
    }

    firstUpdated() {
        this.menuOffset = this.getOffsetTop('.sidebar-wrapper')
        this.getCtas()

        const celebrationModal = this.renderRoot.querySelector('#celebration-modal')
        celebrationModal?.addEventListener('closed.zf.reveal', () => {
            this.showingCelebrationModal = false
        })
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

        this.dispatchEvent(new CustomEvent('route'))
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

    updateLanguageSwitcher() {
        this.languageSelectorElements.forEach((element) => {
            const currentUrl = element.dataset.url
            const indexOfDashboard = currentUrl.indexOf('dashboard')
            const newUrl = currentUrl.slice(0,indexOfDashboard + 'dashboard/'.length) + this.route
            element.dataset.url = newUrl
        })
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
        if (routeName === '3-month-plan' && ( userState.made_post_training_plan )) {
            return true
        }
        return false
    }

    static getLockedStatus(routeName, userState) {
        if (routeName === 'my-plans' && !userState.made_post_training_plan) {
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
    open3MonthPlan() {
        const modal = document.querySelector('#activity-3-month-plan-modal')
        jQuery(modal).foundation('_disableScroll')
        jQuery(modal).foundation('open')
    }
    close3MonthPlan() {
        const modal = document.querySelector('#activity-3-month-plan-modal')
        jQuery(modal).foundation('_enableScroll')
        jQuery(modal).foundation('close')
    }
    handleCreated3MonthPlan() {
        this.dispatchEvent(new CustomEvent('user-state:change', { bubbles: true }))
        this.close3MonthPlan()
        this.navigate(this.makeHref('my-plans'))
    }
    refetchState() {
        this.getCtas()
        makeRequest('GET', 'user_stage', {}, 'zume_system/v1' ).done( ( data ) => {
            if (!data || !data.state) {
                console.error('Stage or state data not returned from api')
            }
            jsObject.user_stage = data
            this.userState = data.state
        })
    }
    refetchHost() {
        makeRequest('GET', 'user_host', {}, 'zume_system/v1' ).done( ( data ) => {
            if (!data) {
                console.error('Host not returned from api')
            }
            jsObject.host_progress = data
        })
    }
    getCtas() {
        /* Get ctas from api */
        makeRequest('POST', 'user_ctas', { user_id: this.userId, language: jsObject.language }, 'zume_system/v1' ).done( ( data ) => {
            const ctas = Object.values(data)

            this.allCtas = ctas

            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array
            }

            const celebrations = this.allCtas.filter(({content_template}) => content_template === 'celebration')
            const cards = this.allCtas.filter(({content_template}) => content_template === 'card')

            const organizedCtas = [ ...celebrations, ...shuffleArray(cards) ]
            this.allCtas = organizedCtas

            /* Save it globally for lower down web components to access */
            jsObject.allCtas = this.allCtas
            this.dispatchEvent( new CustomEvent( 'ctas:changed', { bubbles: true } ) )
        })
    }
    showCelebrationModal() {
        if (this.showingCelebrationModal) {
            return
        }
        const ctaArea = this.renderRoot.querySelector('dash-cta')

        const celebrations = this.allCtas.filter(({content_template}) => content_template === 'celebration')

        if (!ctaArea && celebrations.length > 0) {
            this.showingCelebrationModal = true
            celebrations.forEach(({content: { title, description }}) => {
                this.celebrationModalContent.title = description
                this.celebrationModalContent.content.push(title)
            })
            this.requestUpdate()

            const celebrationModal = document.querySelector('#celebration-modal')
            jQuery(celebrationModal).foundation('open')


            celebrations.forEach(({type, subtype}) => {
                makeRequest('POST', 'log', { type, subtype }, 'zume_system/v1')
            })
            const celebrationKeys = celebrations.map(({key}) => key)
            jsObject.allCtas = jsObject.allCtas.filter(({key}) => !celebrationKeys.includes(key))
        }
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
    unlock3MonthPlan() {
        makeRequest('POST', 'log', { type: 'training', subtype: '26_heard' }, 'zume_system/v1/' ).done( ( data ) => {
            const stateEvent = new CustomEvent('user-state:change', { bubbles: true })
            this.dispatchEvent(stateEvent)
            const hostChangeEvent = new CustomEvent('user-host:change', { bubbles: true })
            this.dispatchEvent(hostChangeEvent)
        })
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
                            class="close-btn ms-auto dashboard__sidebar-toggle break-large break-medium"
                            aria-label=${jsObject.translations.close}
                            type="button"
                            @click=${this.toggleSidebar}
                        >
                            <span class="icon zume-close"></span>
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
                                                            if (DashBoard.getCompletedStatus(route.name, this.userState)) {
                                                                event.preventDefault()
                                                                return
                                                            }
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
                                            .map((route) => {
                                                const isLocked = DashBoard.getLockedStatus(route.name, this.userState)
                                                const isCompleted = DashBoard.getCompletedStatus(route.name, this.userState)
                                                const isHandledLink = route.type === 'handled-link'
                                                return html`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(route.name)}
                                                        icon=${route.icon}
                                                        text=${route.translation}
                                                        ?locked=${isLocked}
                                                        ?disableNavigate=${isHandledLink}
                                                        @click=${isHandledLink ? (event) => {
                                                            if (isCompleted) {
                                                                event.preventDefault()
                                                                return
                                                            }
                                                            route.clickHandler(event, this.dispatchEvent)
                                                        } : null}
                                                        ?completed=${isCompleted}
                                                    ></nav-link>
                                                    <span class="icon ${isLocked ? 'zume-locked gray-500' : 'zume-check-mark success'}"></span>
                                                </li>
                                            `})
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
            <div class="stack | reveal tiny card celebration showing | border-none" id="celebration-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeProfile}>
                    <span class="icon zume-close"></span>
                </button>
                <h2 class="h5 text-center bold">${this.celebrationModalContent.title}</h2>
                <div class="d-flex align-items-center justify-content-between">
                    <img class="w-30" src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                    <img class="w-40" src="${jsObject.images_url + '/thumbs-up.svg'}" alt="" />
                    <img class="w-30" src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                </div>
                <div class="stack--3">
                    ${
                        this.celebrationModalContent.content.map((content) => html`
                            <p><span class="icon zume-check-mark"></span> ${content}</p>
                        `)
                    }
                </div>

            </div>
            <div class="reveal full" id="profile-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeProfile}>
                    <span class="icon zume-close"></span>
                </button>
                <div class="container-xsm my-0">
                    <h3>${jsObject.translations.edit_profile}</h3>
                    <profile-form .userProfile=${this.userProfile}></profile-form>
                    <a href=${jsObject.urls.logout} class="btn outline">${jsObject.translations.logout}</a>
                </div>
            </div>
            <div class="reveal full" id="wizard-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeWizard}>
                    <span class="icon zume-close"></span>
                </button>
                <zume-wizard
                    type=${this.wizardType}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
            </div>
            <div class="reveal full" id="activity-3-month-plan-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeWizard}>
                    <span class="icon zume-close"></span>
                </button>
                ${
                    DashBoard.getLockedStatus('3-month-plan', this.userState)
                        ? html`
                            <div class="container-sm">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-progress dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.locked_3_month_plan}</h3>
                                    <p>${jsObject.translations.locked_3_month_plan_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.unlock3MonthPlan}>${jsObject.translations.locked_3_month_plan_button}</button>
                                </div>
                              </div>
                            </div>
                        `
                        : html`
                        <activity-3-month-plan
                            .questions=${jsObject.three_month_plan_questions}
                            .translations=${{ save: jsObject.translations.save, cancel: jsObject.translations.cancel }}
                            user_id=${this.userProfile.user_id}
                            contact_id=${this.userProfile.contact_id}
                            @3-month-plan-saved=${this.handleCreated3MonthPlan}
                            @3-month-plan-cancelled=${this.close3MonthPlan}
                            showCancel
                        ></activity-3-month-plan>
                    `
                }

            </div>
            <div class="reveal full" id="resources-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeResourcesModal}>
                    <span class="icon zume-close"></span>
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
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeCommunityModal}>
                    <span class="icon zume-close"></span>
                </button>
                <div class="container">
                    ${
                        this.hasJoinedCommunity() ? html`
                            <p>Here is all the community stuff we promised you :)</p>
                        `
                        : html`
                            <div class="container-md stack-2 center | py-2">
                              <h1 class="text-center">Zúme Community</h1>
                              <p>Zúme is a community of practice and encouragement for those who want to see disciple making movements. The Zúme vision is to see one trainee and two simple churches for every 5,000 people in the United States and 50,000 people globally.</p>
                              <div class="switcher | training-path">
                                <div class="stack | card | switcher-width-40">
                                  <h2 class="f-1 text-center">Peer Mentoring</h2>
                                  <img class="mx-auto h-6rem" src="/wp-content/plugins/zume-training-system/site/assets/images/Gather-A-Group-01.svg" alt="Peer Mentoring">
                                  <p class="mb-0">
                                    Connect with others like you who want to see a disciple making movement in their area. Share your experience with others, and learn from others who are discovering new things.
                                  </p>
                                </div>
                                <div class="stack | card | switcher-width-40">
                                  <h2 class="f-1 text-center">Encouragement</h2>
                                  <img class="mx-auto h-6rem" src="/wp-content/plugins/zume-training-system/site/assets/images/coach-2guys.svg" alt="Free Tools">
                                  <p class="mb-0">
                                    Hear news about disciple making movements in your region and your wider country, get reports of  progress, and get connected to online and face-to-face gatherings.
                                  </p>
                                </div>
                                <div class="stack | card | switcher-width-40">
                                  <h2 class="f-1 text-center">Free Tools</h2>
                                  <img class="mx-auto h-6rem" src="/wp-content/plugins/zume-training-system/site/assets/images/JoinTraining.svg" alt="Encouragement">
                                  <p class="mb-0">
                                    Access free tools for tracking disciple-making and church planting in your area. Get a map to cast vision for saturating your city with multiplying disciples and churches.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="container-md center">
                              <button class="btn large" @click=${this.joinCommunity}>
                                JOIN FOR FREE
                              </button>
                            </div>
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
