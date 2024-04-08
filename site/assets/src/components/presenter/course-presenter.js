import { LitElement, html, css } from 'lit';

const courseViews = [
    'slideshow',
    'guide',
]

export class CoursePresenter extends LitElement {
    static get properties() {
        return {
            languageCode: { type: String },
            homeUrl: { type: String },
            assetsPath: { type: String },
            zumeSessions: { attribute: false },
            menu: { attribute: false },
            lessonIndex: { attribute: false },
            sessionKey: { attribute: false },
            view: { attribute: false },
            linkNodes: { attribute: false },
            showIndex: { attribute: false },
        };
    }

    constructor() {
        super()

        this.dir = document.querySelector('html').dir

        const url = new URL(window.location.href)

        const { sessions, menu } = this.getZumeSessions(url);
        this.zumeSessions = sessions
        this.menu = menu

        const lessonIndex = this.getLessonIndex(url);
        this.lessonIndex = lessonIndex
        this.sessionKey = ''

        this.view = this.getView(url);

        this.changeSession(lessonIndex, false, sessions)

        this.handleSessionLink = this.handleSessionLink.bind(this)
        this.handleHistoryPopState = this.handleHistoryPopState.bind(this)
        window.addEventListener('popstate', this.handleHistoryPopState)

        const languageSelectors = document.querySelectorAll('.language-selector')
        languageSelectors.forEach(function(languageSelector) {
            languageSelector.addEventListener('click', () => {
                const newLanguageCode = languageSelector.dataset.value

                const url = new URL(location.href)

                const urlPieces = url.pathname.substring(1).split('/')

                let newUrl = ''
                if ( urlPieces.length > 0 && jsObject.zume_languages.includes(urlPieces[0]) ) {
                    newUrl = urlPieces.slice(1).join('/')
                } else {
                    newUrl = urlPieces.join('/')
                }

                if (newLanguageCode !== 'en') {
                    newUrl = '/' + newLanguageCode + '/' + newUrl
                } else {
                    newUrl = '/' + newUrl
                }

                newUrl += url.search

                location.href = newUrl
            })
        })

    }

    getView(url) {
        if (url.searchParams.has('view')) {
            const view = url.searchParams.get('view');
            if (courseViews.includes(view)) {
                return view;
            }
        } else {
            return 'slideshow';
        }
    }

    getLessonIndex(url) {
        if (url.searchParams.has('session')) {
            const sessionIndexRaw = url.searchParams.get('session')

            if (sessionIndexRaw === 'index') {
                return 'index'
            }

            const sessionIndex = Number(sessionIndexRaw);
            if (Number.isInteger(sessionIndex)) {
                return sessionIndex - 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    getZumeSessions(url) {
        const type = url.searchParams.get('type') || '10';

        this.type = type

        let sessions;
        let menu;
        switch (type) {
            case '10':
                sessions = zume10Sessions;
                menu = zume10SessionsMenu;
                break;
            case '20':
                sessions = zume20Sessions;
                menu = zume20SessionsMenu;
                break;
            case 'intensive':
                sessions = zumeIntensiveSessions;
                menu = zumeIntensiveSessionsMenu;
                break;
            default:
                sessions = zume10Sessions;
                menu = zume10SessionsMenu;
                break;
        }
        return { sessions, menu };
    }

    handleSessionLink(event) {
        const link = event.target
        const sessionNumber = Number(link.dataset.sessionNumber)
        this.lessonIndex = sessionNumber

        if ( this.showIndex === true ) {
            this.showIndex = false
        }
        this.changeSession(this.lessonIndex)
        this.closeMenu()
    }

    handleSubSectionLink(sessionNumber, subsectionKey) {
        this.lessonIndex = sessionNumber

        this.changeSession(this.lessonIndex)
        this.sessionKey = subsectionKey
        this.closeMenu()
    }

    getNextSession() {
        this.lessonIndex += 1
        this.changeSession(this.lessonIndex)
    }
    getPreviousSession() {
        this.lessonIndex -= 1
        this.changeSession(this.lessonIndex)
    }

    changeSession(index, pushState = true, zumeSessions = null) {

        if (index === 'index') {
            this.showIndex = true
            return
        } else {
            this.showIndex = false
        }

        const sessions = zumeSessions || this.zumeSessions

        let thisIndex = index
        if ( index < 0 ) {
            thisIndex = 0
        }
        if ( index > sessions.length - 1 ) {
            thisIndex = sessions.length - 1
        }
        this.lessonIndex = thisIndex
        this.session = sessions[thisIndex]

        if (pushState) {
            this.pushHistory()
        }
    }

    pushHistory() {
        const sessionIndex = this.lessonIndex
        const view = this.view


        const url = new URL(window.location.href)
        if (sessionIndex !== null && Number.isInteger(sessionIndex)) {
            url.searchParams.set('session', sessionIndex + 1)
        }
        if (view) {
            url.searchParams.set('view', view)
        }
        window.history.pushState(null, null, url.href)
    }
    handleHistoryPopState() {
        const url = new URL(location.href)
        const sessionIndex = url.searchParams.has('session') ? url.searchParams.get('session') : null
        const view = url.searchParams.get('view')

        /* hide any left open overlays from the menu */
        document.querySelector('.js-off-canvas-overlay')?.classList.remove('is-visible')

        if (Number.isInteger(Number(sessionIndex))) {
            this.lessonIndex = sessionIndex - 1
            this.changeSession(this.lessonIndex, false)
        }
        if (sessionIndex === 'index') {
            this.lessonIndex = 'index'
            this.changeSession('index', false)
        }

        if (view && courseViews.includes(view)) {
            this.view = view
        }

    }

    getSessionSections() {
        if ( !this.session ) {
            return []
        }
        return this.session
    }

    switchViews(pushState = true) {
        if ( this.view === 'guide' ) {
            this.view = 'slideshow'
        } else {
            this.view = 'guide'
        }

        if ( pushState === true) {
            this.pushHistory()
        }
    }

    openMenu() {
        const menu = this.querySelector('#offCanvas')
        jQuery(menu).foundation('open')
    }
    closeMenu() {
        const menu = this.querySelector('#offCanvas')
        jQuery(menu).foundation('close')
    }

    render() {
        const hiddenClass = this.showIndex ? 'visually-hidden' : ''
        const containerClass = this.type === 'intensive' ? 'container-xsm' : 'container-sm'

        /* If this is the overall presenter, then it would have a top bar, navigation buttons etc. as well */
        /* And also have a sidebar with the contents list in */
        return html`
            ${
                this.showIndex ? html`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${containerClass}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((session, sessionNumber) => html`
                                    <button
                                        class="card-btn | bg-white black m--2 gap--3 aspect-1 justify-content-evenly"
                                        data-session-number=${sessionNumber}
                                        @click=${this.handleSessionLink}
                                    >
                                        <h2 class="f-0 bold">${jsObject.translations.session}</h2>
                                        <p class="f-3 bold lh-sm">${sessionNumber + 1}</p>
                                        <span class="icon zume-course brand-light f-3"></span>
                                    </button>
                                `)}
                            </div>
                        </div>
                    </div>
                ` : ''
            }

            <nav class="stack | bg-white px-0 text-center | presenter-menu off-canvas ${this.dir === 'rtl' ? 'position-right' : 'position-left'} justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
                <div class="stack">
                    <!-- Close button -->
                    <button class="close-button" aria-label="Close menu" type="button" data-close>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <!-- Menu -->

                    <ul class="vertical menu accordion-menu" data-accordion-menu data-submenu-toggle="true" data-multi-open="false">
                        ${Object.values(this.menu).map(({title, submenu}, sessionNumber) => html`
                            <li>
                                <a
                                    class="session-link"
                                    data-session-number="${sessionNumber}"
                                    @click=${this.handleSessionLink}
                                >
                                    ${title}
                                </a>
                                <ul class="menu vertical nested ${this.lessonIndex === sessionNumber ? 'is-active' : ''}">
                                    ${
                                        submenu.map(({ key, title, length }) => html`
                                            <a
                                                class="session-link"
                                                data-subitem
                                                href=${`#${key}`}
                                                @click=${() => this.handleSubSectionLink(sessionNumber, key)}
                                            >
                                                <span>${title}</span> <span>${length}</span>
                                            </a>
                                        `)
                                    }

                                </ul>
                            </li>
                        `)}
                    </ul>
                </div>

                <div class="">

                    <div class="cluster">
                        <a class="btn light uppercase tight" href="${this.homeUrl}">${jsObject.translations.home}</a>
                        <button class="btn d-flex align-items-center justify-content-center gap--4 light tight" data-open="language-menu-reveal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
                            ${this.languageCode}
                        </button>
                        <button class="btn light tight outline" @click=${() => this.switchViews()}>${jsObject.translations.switch_views}</button>
                    </div>
                </div>
            </nav>

            <span class="p-1 d-block fixed top z-1">
                <button id="hamburger-menu" class="nav-toggle show" @click=${this.openMenu}>
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="">
                ${
                    this.view === 'guide'
                    ? html`<course-guide .sections=${this.getSessionSections()}></course-guide>`
                    : html`<course-slideshow .sections=${this.getSessionSections()} startSlideKey=${this.sessionKey}></course-slideshow>`
                }
            </div>
        `
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}
customElements.define('course-presenter', CoursePresenter);
