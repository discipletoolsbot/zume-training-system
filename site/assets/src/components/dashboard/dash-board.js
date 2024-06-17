import { LitElement, html } from 'lit'
import { navigator, router } from 'lit-element-router'
import { dashRoutes } from './dash-routes'
import { repeat } from 'lit/directives/repeat.js'
import { Wizards } from '../wizard/wizard-constants'
import { RouteNames } from './routes'
import { zumeRequest } from '../../js/zumeRequest'

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
            trainingGroups: { type: Array, attribute: false },
            wizardType: { type: String, attribute: false },
            celbrationModalContent: { type: Object, attribute: false },
            myTrainingsOpen: { type: Boolean, attribute: false },
        }
    }

    static get routes() {
        const redirectRoutes = {
            1: 'getting-started',
            2: 'training',
            3: 'practicing',
        }
        const userStage = jsObject.user_stage.value || 1
        const redirectRouteIndex = userStage < 4 ? userStage : 3

        const redirectRoute = dashRoutes().find(
            ({ name }) => name === redirectRoutes[redirectRouteIndex]
        )
        const { makeComponent } = redirectRoute.data

        /* Setup the route of the /dashboard url to point to the appropriate landing stage of the user */
        const routes = dashRoutes().map((route) => {
            if (route.name === 'root') {
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

        return routes.filter(({ parent }) => parent === parentName)
    }

    constructor() {
        super()
        this.route = ''
        this.params = {}
        this.query = {}
        this.data = {}
        this.menuOffset = 0
        this.userProfile = jsObject.profile
        this.userState = jsObject.user_stage.state ?? {}
        this.trainingGroups = jsObject.training_groups
        this.wizardType = ''
        this.celebrationModalContent = {
            title: '',
            content: [],
        }

        this.allCtas = []
        this.ctas = []
        this.userId = jsObject.profile.user_id
        this.showingCelebrationModal = false
        this.unlockedSection = []

        this.languageSelectorElements =
            document.querySelectorAll('.language-selector')

        this.updateUserProfile = this.updateUserProfile.bind(this)
        this.updateWizardType = this.updateWizardType.bind(this)
        this.closeWizard = this.closeWizard.bind(this)
        this.refetchState = this.refetchState.bind(this)
        this.refetchHost = this.refetchHost.bind(this)
        this.getCtas = this.getCtas.bind(this)
        this.redirectToPage = this.redirectToPage.bind(this)
        this.showCelebrationModal = this.showCelebrationModal.bind(this)
        this.updateTrainingGroups = this.updateTrainingGroups.bind(this)
    }

    connectedCallback() {
        super.connectedCallback()

        window.addEventListener('user-profile:change', this.updateUserProfile)
        window.addEventListener('toggle-dashboard-sidebar', this.toggleSidebar)
        window.addEventListener('open-wizard', this.updateWizardType)
        window.addEventListener('wizard-finished', this.closeWizard)
        window.addEventListener('wizard-finished', this.getCtas)
        window.addEventListener('wizard-finished', this.redirectToPage)
        window.addEventListener('open-3-month-plan', this.open3MonthPlan)
        window.addEventListener('user-state:change', this.refetchState)
        window.addEventListener('user-state:change', this.getCtas)
        window.addEventListener('user-host:change', this.refetchHost)
        window.addEventListener('training:changed', this.updateTrainingGroups)

        window.addEventListener('load', this.showCelebrationModal)
        window.addEventListener('ctas:changed', this.showCelebrationModal)

        this.addEventListener('route', this.updateLanguageSwitcher)
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        window.removeEventListener(
            'user-profile:change',
            this.updateUserProfile
        )
        window.removeEventListener(
            'toggle-dashboard-sidebar',
            this.toggleSidebar
        )
        window.removeEventListener('open-wizard', this.updateWizardType)
        window.removeEventListener('wizard-finished', this.closeWizard)
        window.removeEventListener('wizard-finished', this.getCtas)
        window.removeEventListener('wizard-finished', this.redirectToPage)
        window.removeEventListener('open-3-month-plan', this.open3MonthPlan)
        window.removeEventListener('user-state:change', this.refetchState)
        window.removeEventListener('user-state:change', this.getCtas)
        window.removeEventListener('user-host:change', this.refetchHost)
        window.removeEventListener(
            'training:changed',
            this.updateTrainingGroups
        )

        window.removeEventListener('load', this.showCelebrationModal)
        window.removeEventListener('ctas:changed', this.showCelebrationModal)

        this.removeEventListener('route', this.updateLanguageSwitcher)
    }

    firstUpdated() {
        this.menuOffset = this.getOffsetTop('.sidebar-wrapper')
        this.getCtas()

        const celebrationModal =
            this.renderRoot.querySelector('#celebration-modal')
        celebrationModal?.addEventListener('closed.zf.reveal', () => {
            this.showingCelebrationModal = false
        })
        this.trainingGroupsOpen = jQuery('#training-groups-menu').hasClass(
            'is-active'
        )
    }

    updateWizardType(event) {
        const { type, params } = event.detail
        this.openWizard(type, params)
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

        const route = routes.find(({ name }) => name === routeName)

        if (!route) {
            console.error('MISSING ROUTE', routeName)
            return ''
        }

        if (routeName === RouteNames.myTraining) {
            const isLocked = DashBoard.getLockedStatus(
                routeName,
                this.userState
            )

            if (isLocked) {
                return route.pattern.replace(':code', 'teaser')
            }
            const numberOfGroups = this.numberOfGroups()
            if (numberOfGroups === 1) {
                const code = Object.values(this.trainingGroups)[0].join_key
                return route.pattern.replace(':code', code)
            }
        }

        return route.pattern
    }
    makeTrainingHref(code) {
        const pattern = this.makeHrefRoute(RouteNames.myTraining)

        return pattern.replace(':code', code)
    }

    renderRoute() {
        const { makeComponent } = this.data

        if (!makeComponent) {
            return ''
        }

        if (this.route === RouteNames.myTraining) {
            const code = this.params.code
            return makeComponent(code)
        }

        const isLocked = DashBoard.getLockedStatus(this.route, this.userState)

        return makeComponent(isLocked)
    }

    getOffsetTop(querySelector) {
        const element = this.querySelector(querySelector)
        const offsetTop = element.offsetTop
        return offsetTop
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.dashboard__sidebar')
        const backgroundTrigger = document.querySelector(
            '.sidebar__trigger-close-background'
        )
        const transitionDuration = '200'

        sidebar.style.transitionDuration = transitionDuration
        backgroundTrigger.style.transitionDuration = transitionDuration

        const state = sidebar.dataset.state

        if (state === 'open') {
            sidebar.dataset.state = 'closed'
            backgroundTrigger.style.opacity = 0
            setTimeout(() => {
                backgroundTrigger.style.visibility = 'hidden'
            }, transitionDuration)
        }
        if (!state || state === 'closed') {
            sidebar.dataset.state = 'open'
            backgroundTrigger.style.opacity = 'initial'
            backgroundTrigger.style.visibility = 'visible'
        }
    }

    updateLanguageSwitcher() {
        this.languageSelectorElements.forEach((element) => {
            const currentUrl = element.dataset.url
            const indexOfDashboard = currentUrl.indexOf('dashboard')
            const newUrl =
                currentUrl.slice(0, indexOfDashboard + 'dashboard/'.length) +
                this.route
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
        const initials = name
            .split(' ')
            .map((text) => (text.length > 0 ? text[0].toUpperCase() : ''))
            .slice(0, 2)
            .join('')
        return initials
    }

    static getCompletedStatus(routeName, userState) {
        if (
            routeName === RouteNames.setProfile &&
            userState.set_profile_location &&
            userState.set_profile_name
        ) {
            return true
        }
        if (routeName === RouteNames.getACoach && userState.requested_a_coach) {
            return true
        }
        if (
            routeName === RouteNames.joinATraining &&
            (userState.plan_created || userState.joined_online_training)
        ) {
            return true
        }
        if (
            routeName === RouteNames.createATraining &&
            (userState.plan_created || userState.joined_online_training)
        ) {
            return true
        }
        if (
            routeName === RouteNames.threeMonthPlan &&
            userState.made_post_training_plan
        ) {
            return true
        }
        return false
    }

    static getLockedStatus(routeName, userState) {
        if (
            routeName === RouteNames.myPlans &&
            !userState.made_post_training_plan
        ) {
            return true
        }
        if (
            [RouteNames.myChurches, RouteNames.myMaps].includes(routeName) &&
            !userState.join_community
        ) {
            return true
        }
        if (
            routeName === RouteNames.threeMonthPlan &&
            !userState.can_create_3_month_plan
        ) {
            return true
        }
        if (
            routeName === RouteNames.myTraining &&
            !userState.plan_created &&
            !userState.joined_online_training
        ) {
            return true
        }
        if (routeName === RouteNames.myCoach && !userState.requested_a_coach) {
            return true
        }
        return false
    }

    isGettingStartedActive() {
        const isActive = DashBoard.childRoutesOf(
            RouteNames.gettingStarted
        ).some(
            (route) => !DashBoard.getCompletedStatus(route.name, this.userState)
        )
        return isActive
    }

    getGettingStartedPercentage() {
        const itemsToComplete = [
            RouteNames.getACoach,
            RouteNames.setProfile,
            RouteNames.joinATraining,
        ]

        const numberCompleted = itemsToComplete.reduce((total, item) => {
            if (DashBoard.getCompletedStatus(item, this.userState)) {
                return total + 1
            }
            return total
        }, 0)

        return Math.round((numberCompleted / itemsToComplete.length) * 100)
    }

    openWizard(type, params = '') {
        const modal = document.querySelector('#wizard-modal')
        jQuery(modal).foundation('open')
        this.wizardType = type
        this.wizardParams = params
    }
    closeWizard() {
        this.wizardType = ''
        this.wizardParams = ''
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
        this.dispatchEvent(
            new CustomEvent('user-state:change', { bubbles: true })
        )
        this.close3MonthPlan()
        this.navigate(this.makeHref(RouteNames.myPlans))
    }
    unlock3MonthPlan() {
        const data = { type: 'training', subtype: '26_heard' }
        this.unlockedSection.push(data)
        makeRequest('POST', 'log', data, 'zume_system/v1/').done((data) => {
            this.dispatchEvent(
                new CustomEvent('user-state:change', { bubbles: true })
            )
            this.dispatchEvent(
                new CustomEvent('user-host:change', { bubbles: true })
            )
        })
    }

    refetchState() {
        this.getCtas()
        makeRequest('GET', 'user_stage', {}, 'zume_system/v1').done((data) => {
            if (!data || !data.state) {
                console.error('Stage or state data not returned from api')
            }
            jsObject.user_stage = data
            this.userState = data.state
        })
    }
    refetchHost() {
        makeRequest('GET', 'user_host', {}, 'zume_system/v1').done((data) => {
            if (!data) {
                console.error('Host not returned from api')
            }
            jsObject.host_progress = data
        })
    }
    getCtas() {
        /* Get ctas from api */
        zumeRequest
            .post('user_ctas', {
                user_id: this.userId,
                language: jsObject.language,
            })
            .then((data) => {
                const ctas = Object.values(data)
                let filteredCtas = ctas
                let filteredOutCtas = []

                /* If we triggered getting ctas because we unlocked something manually, let's filter out the celebrations due to that */
                if (this.unlockedSection.length > 0) {
                    const filteredCtaKeys = this.unlockedSection.map(
                        (data) => data.type + '_' + data.subtype
                    )

                    filteredCtas = ctas.filter(
                        (cta) =>
                            !cta.required_keys.some((key) =>
                                filteredCtaKeys.includes(key)
                            )
                    )
                    filteredOutCtas = ctas.filter((cta) =>
                        cta.required_keys.some((key) =>
                            filteredCtaKeys.includes(key)
                        )
                    )
                }

                this.allCtas = filteredCtas

                const shuffleArray = (array) => {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1))
                        ;[array[i], array[j]] = [array[j], array[i]]
                    }
                    return array
                }

                const celebrations = this.allCtas.filter(
                    ({ content_template }) => content_template === 'celebration'
                )
                const cards = this.allCtas.filter(
                    ({ content_template }) => content_template === 'card'
                )

                const organizedCtas = [...celebrations, ...shuffleArray(cards)]
                this.allCtas = organizedCtas

                /* Save it globally for lower down web components to access */
                jsObject.allCtas = this.allCtas
                this.dispatchEvent(
                    new CustomEvent('ctas:changed', { bubbles: true })
                )

                if (filteredOutCtas.length > 0) {
                    const promises = filteredOutCtas.map((cta) => {
                        const key =
                            cta.disable_keys.length > 0
                                ? cta.disable_keys[0]
                                : ''

                        if (!key) {
                            return Promise.resolve()
                        }
                        const type = key.substring(0, key.indexOf('_'))
                        const subtype = key.substr(key.indexOf('_') + 1)
                        return zumeRequest.post('log', { type, subtype })
                    })

                    Promise.all(promises).finally(() => {
                        this.dispatchEvent(
                            new CustomEvent('ctas:changed', { bubbles: true })
                        )
                    })
                }
            })
    }
    showCelebrationModal() {
        if (this.showingCelebrationModal) {
            return
        }
        const ctaArea = this.renderRoot.querySelector('dash-cta')

        const celebrations = this.allCtas.filter(
            ({ content_template }) => content_template === 'celebration'
        )

        if (!ctaArea && celebrations.length > 0) {
            this.showingCelebrationModal = true
            celebrations.forEach(({ content: { title, description } }) => {
                this.celebrationModalContent.title = description
                this.celebrationModalContent.content.push(title)
            })
            this.requestUpdate()

            const celebrationModal =
                document.querySelector('#celebration-modal')
            jQuery(celebrationModal).foundation('open')

            celebrations.forEach(({ type, subtype }) => {
                makeRequest(
                    'POST',
                    'log',
                    { type, subtype },
                    'zume_system/v1'
                ).done(() => {
                    this.dispatchEvent(
                        new CustomEvent('ctas:changed', { bubbles: true })
                    )
                })
            })
            const celebrationKeys = celebrations.map(({ key }) => key)
            this.allCtas = jsObject.allCtas.filter(
                ({ key }) => !celebrationKeys.includes(key)
            )
            jsObject.allCtas = this.allCtas
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

    openCommunityWizard(event) {
        event.preventDefault()
        this.openWizard(Wizards.joinCommunity)
    }
    hasJoinedCommunity() {
        return this.userState.join_community ? true : false
    }

    numberOfGroups() {
        return Object.keys(this.trainingGroups).length
    }
    toggleTrainingGroups() {
        jQuery(document).foundation()
        jQuery('#training-menu').foundation(
            'toggle',
            jQuery('#training-groups-menu')
        )
        this.trainingGroupsOpen = jQuery('#training-groups-menu').hasClass(
            'is-active'
        )
    }
    redirectToPage(event) {
        const { type } = event.detail

        if (type === Wizards.getACoach) {
            this.navigate(this.makeHref(RouteNames.myCoach))
        }

        if (
            [
                Wizards.makeAGroup,
                Wizards.makeFirstGroup,
                Wizards.joinATraining,
                Wizards.joinFriendsPlan,
            ].includes(type)
        ) {
            makeRequest('GET', 'plans', {}, 'zume_system/v1').then(
                (results) => {
                    const oldTrainingGroups = { ...this.trainingGroups }
                    const oldTrainingGroupKeys = Object.keys(oldTrainingGroups)

                    this.trainingGroups = results
                    jsObject.training_groups = results

                    const newTrainingGroupIds = Object.keys(
                        this.trainingGroups
                    ).filter((key) => !oldTrainingGroupKeys.includes(key))

                    if (newTrainingGroupIds.length === 1) {
                        const newTrainingGroup =
                            this.trainingGroups[newTrainingGroupIds[0]]

                        const url = this.makeTrainingHref(
                            newTrainingGroup.join_key
                        )

                        this.navigate(url)
                    }
                }
            )
        }
    }
    updateTrainingGroups() {
        zumeRequest.get('plans', {}).then((results) => {
            this.trainingGroups = results
        })
    }

    render() {
        return html`
            <div
                class="sidebar__trigger-close-background"
                @click=${this.toggleSidebar}
            ></div>
            <div class="dashboard">
                <div class="dashboard__sidebar">
                    <div
                        class="sidebar-wrapper"
                        style="top: ${this
                            .menuOffset}px; height: calc( min( 100%, 100vh ) - ${this
                            .menuOffset}px - var(--s0) );"
                    >
                        <button
                            class="close-btn ms-auto dashboard__sidebar-toggle break-large break-medium"
                            aria-label=${jsObject.translations.close}
                            type="button"
                            @click=${this.toggleSidebar}
                        >
                            <span class="icon z-icon-close"></span>
                        </button>
                        <div class="profile-area">
                            <button
                                class="profile-btn"
                                @click=${this.openProfile}
                            >
                                ${this.createInitials(this.userProfile.name)}
                            </button>
                            <span class="profile-name"
                                >${this.userProfile.name}</span
                            >
                        </div>
                        <div class="stack-2 | progress-menu">
                            <ul
                                class="accordion-menu"
                                data-accordion-menu
                                data-submenu-toggle="true"
                            >
                                <li class="menu-section" data-no-toggle>
                                    <nav-link
                                        href=${this.makeHref(
                                            RouteNames.gettingStarted
                                        )}
                                        class="menu-section__title menu-btn"
                                        icon="z-icon-start"
                                        text=${jsObject.translations
                                            .getting_started}
                                        as="nav"
                                    >
                                    </nav-link>
                                    ${this.isGettingStartedActive()
                                        ? html`
                                              <progress-circle
                                                  percent=${this.getGettingStartedPercentage()}
                                                  radius="12"
                                              ></progress-circle>
                                          `
                                        : html`<span
                                              class="z-icon-check-mark success f-2"
                                          ></span>`}
                                    <ul
                                        class="nested ${this.isGettingStartedActive()
                                            ? 'is-active'
                                            : ''}"
                                    >
                                        ${DashBoard.childRoutesOf(
                                            RouteNames.gettingStarted
                                        ).map(
                                            (route) => html`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(
                                                            route.name
                                                        )}
                                                        icon=${route.icon}
                                                        text=${route.translation}
                                                        as=${route.type ===
                                                        'handled-link'
                                                            ? 'button'
                                                            : 'navs'}
                                                        @click=${route.type ===
                                                        'handled-link'
                                                            ? (event) => {
                                                                  if (
                                                                      DashBoard.getCompletedStatus(
                                                                          route.name,
                                                                          this
                                                                              .userState
                                                                      )
                                                                  ) {
                                                                      event.preventDefault()
                                                                      return
                                                                  }
                                                                  route.clickHandler(
                                                                      event,
                                                                      this
                                                                          .dispatchEvent
                                                                  )
                                                              }
                                                            : null}
                                                        ?completed=${DashBoard.getCompletedStatus(
                                                            route.name,
                                                            this.userState
                                                        )}
                                                    ></nav-link>
                                                    <span
                                                        class="icon z-icon-check-mark success"
                                                    ></span>
                                                </li>
                                            `
                                        )}
                                    </ul>
                                </li>
                            </ul>
                            <div class="menu-section">
                                <nav-link
                                    href=${this.makeHref(RouteNames.training)}
                                    class="menu-section__title menu-btn"
                                    icon="z-icon-training"
                                    text=${jsObject.translations.training}
                                    as="nav"
                                >
                                </nav-link>
                                <ul
                                    id="training-menu"
                                    class="nested accordion-menu menu vertical"
                                    data-accordion-menu
                                >
                                    ${DashBoard.childRoutesOf(
                                        RouteNames.training
                                    ).map((route) => {
                                        const isLocked =
                                            DashBoard.getLockedStatus(
                                                route.name,
                                                this.userState
                                            )
                                        const isCompleted =
                                            DashBoard.getCompletedStatus(
                                                route.name,
                                                this.userState
                                            )
                                        const isHandledLink =
                                            route.type === 'handled-link'

                                        if (
                                            route.name ===
                                                RouteNames.myTraining &&
                                            this.numberOfGroups() > 1
                                        ) {
                                            return html`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        icon=${route.icon}
                                                        text=${jsObject
                                                            .translations
                                                            .my_trainings}
                                                        as="nav"
                                                        href=${this.makeHref(
                                                            'my-trainings'
                                                        )}
                                                    ></nav-link>
                                                    <button
                                                        class="d-flex justify-content-center"
                                                        @click=${this
                                                            .toggleTrainingGroups}
                                                    >
                                                        <img
                                                            class="training-groups__toggle svg w-1rem h-1rem"
                                                            src=${jsObject.images_url +
                                                            '/chevron.svg'}
                                                        />
                                                    </button>
                                                    <ul
                                                        id="training-groups-menu"
                                                        class="menu vertical nested"
                                                    >
                                                        ${repeat(
                                                            Object.entries(
                                                                this
                                                                    .trainingGroups
                                                            ),
                                                            ([key]) => key,
                                                            ([
                                                                key,
                                                                group,
                                                            ]) => html`
                                                                <li>
                                                                    <nav-link
                                                                        class="menu-btn"
                                                                        as="nav"
                                                                        text=${group.title}
                                                                        href=${this.makeTrainingHref(
                                                                            group.join_key
                                                                        )}
                                                                    ></nav-link>
                                                                </li>
                                                            `
                                                        )}
                                                    </ul>
                                                </li>
                                            `
                                        }
                                        return html`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(
                                                        route.name
                                                    )}
                                                    icon=${route.icon}
                                                    text=${route.translation}
                                                    ?locked=${isLocked}
                                                    as=${isHandledLink
                                                        ? 'link'
                                                        : 'nav'}
                                                    @click=${isHandledLink
                                                        ? (event) => {
                                                              if (isCompleted) {
                                                                  event.preventDefault()
                                                                  return
                                                              }
                                                              route.clickHandler(
                                                                  event,
                                                                  this
                                                                      .dispatchEvent
                                                              )
                                                          }
                                                        : null}
                                                    ?completed=${isCompleted}
                                                ></nav-link>
                                                <span
                                                    class="icon ${isLocked
                                                        ? 'z-icon-locked gray-500'
                                                        : 'z-icon-check-mark success'}"
                                                ></span>
                                            </li>
                                        `
                                    })}
                                </ul>
                            </div>
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref(RouteNames.practicing)}
                                    class="menu-section__title menu-btn"
                                    icon="z-icon-practicing"
                                    text=${jsObject.translations.practicing}
                                    as="nav"
                                ></nav-link>
                                <ul class="nested">
                                    ${DashBoard.childRoutesOf(
                                        RouteNames.practicing
                                    ).map(
                                        (route) => html`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(
                                                        route.name
                                                    )}
                                                    icon=${route.icon}
                                                    text=${route.translation}
                                                    ?locked=${DashBoard.getLockedStatus(
                                                        route.name,
                                                        this.userState
                                                    )}
                                                    as="nav"
                                                ></nav-link>
                                                <span
                                                    class="icon z-icon-locked gray-500"
                                                ></span>
                                            </li>
                                        `
                                    )}
                                </ul>
                            </li>
                        </div>
                        <div class="footer-links">
                            ${!this.hasJoinedCommunity()
                                ? html`
                                      <nav-link
                                          class="menu-btn | f--1"
                                          href=""
                                          icon="z-icon-community"
                                          text=${this.hasJoinedCommunity()
                                              ? jsObject.translations.community
                                              : jsObject.translations
                                                    .join_the_community}
                                          as="link"
                                          @click=${this.openCommunityWizard}
                                      ></nav-link>
                                  `
                                : ''}
                            <nav-link
                                class="menu-btn | f--1"
                                href=${jsObject.urls.resources}
                                icon="z-icon-resources"
                                text=${jsObject.translations.resources}
                                as="link"
                            ></nav-link>
                        </div>
                    </div>
                </div>

                ${this.renderRoute()}
            </div>
            <div
                class="stack | reveal tiny card celebration showing | border-none"
                id="celebration-modal"
                data-reveal
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeProfile}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <h2 class="h5 text-center bold">
                    ${this.celebrationModalContent.title}
                </h2>
                <div class="d-flex align-items-center justify-content-between">
                    <img
                        class="w-30"
                        src="${jsObject.images_url + '/fireworks-2.svg'}"
                        alt=""
                    />
                    <img
                        class="w-40"
                        src="${jsObject.images_url + '/thumbs-up.svg'}"
                        alt=""
                    />
                    <img
                        class="w-30"
                        src="${jsObject.images_url + '/fireworks-2.svg'}"
                        alt=""
                    />
                </div>
                <div class="stack--3">
                    ${this.celebrationModalContent.content.map(
                        (content) => html`
                            <p>
                                <span class="icon z-icon-check-mark"></span>
                                ${content}
                            </p>
                        `
                    )}
                </div>
            </div>
            <div class="reveal full" id="profile-modal" data-reveal>
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeProfile}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="container-xsm my-0">
                    <h3>${jsObject.translations.edit_profile}</h3>
                    <profile-form
                        .userProfile=${this.userProfile}
                    ></profile-form>
                    <a href=${jsObject.urls.logout} class="btn outline"
                        >${jsObject.translations.logout}</a
                    >
                </div>
            </div>
            <div class="reveal full" id="wizard-modal" data-reveal>
                <zume-wizard
                    type=${this.wizardType}
                    .params=${this.wizardParams}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
            </div>
            <div
                class="reveal full"
                id="activity-3-month-plan-modal"
                data-reveal
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeWizard}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                ${DashBoard.getLockedStatus('3-month-plan', this.userState)
                    ? html`
                          <div class="container-sm">
                              <div class="dash-menu__list-item">
                                  <div class="dash-menu__icon-area | stack--5">
                                      <span
                                          class="icon z-icon-progress dash-menu__list-icon"
                                      ></span>
                                  </div>
                                  <div
                                      class="dash-menu__text-area | switcher | switcher-width-20"
                                  >
                                      <div>
                                          <h3 class="f-1 bold uppercase">
                                              ${jsObject.translations
                                                  .locked_3_month_plan}
                                          </h3>
                                          <p>
                                              ${jsObject.translations
                                                  .locked_3_month_plan_explanation}
                                          </p>
                                      </div>
                                      <button
                                          class="dash-menu__view-button btn tight"
                                          @click=${this.unlock3MonthPlan}
                                      >
                                          ${jsObject.translations.unlock}
                                      </button>
                                  </div>
                              </div>
                          </div>
                      `
                    : html`
                          <activity-3-month-plan
                              .questions=${jsObject.three_month_plan_questions}
                              .translations=${jsObject.three_month_plan_translations}
                              user_id=${this.userProfile.user_id}
                              contact_id=${this.userProfile.contact_id}
                              @3-month-plan-saved=${this
                                  .handleCreated3MonthPlan}
                              @3-month-plan-cancelled=${this.close3MonthPlan}
                              showCancel
                          ></activity-3-month-plan>
                      `}
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-board', DashBoard)
