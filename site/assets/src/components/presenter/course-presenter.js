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
            translations: { type: Object },
            zumeSessions: { attribute: false },
            lessonIndex: { attribute: false },
            view: { attribute: false },
            linkNodes: { attribute: false },
            showIndex: { attribute: false },
        };
    }

    constructor() {
        super()

        const url = new URL(window.location.href)

        const zumeSessions = this.getZumeSessions(url);
        this.zumeSessions = zumeSessions

        const lessonIndex = this.getLessonIndex(url);
        this.lessonIndex = lessonIndex

        this.view = this.getView(url);

        this.changeSession(lessonIndex, false, zumeSessions)

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

        let zumeSessions;
        switch (type) {
            case '10':
                zumeSessions = zume10Sessions;
                break;
            case '20':
                zumeSessions = zume20Sessions;
                break;
            case 'intensive':
                zumeSessions = zumeIntensiveSessions;
                break;
            default:
                zumeSessions = zume10Sessions;
                break;
        }
        return zumeSessions;
    }

    handleSessionLink(event) {
        const link = event.target
        const sessionNumber = Number(link.dataset.sessionNumber)
        this.lessonIndex = sessionNumber

        if ( this.showIndex === true ) {
            this.showIndex = false
        }
        this.changeSession(this.lessonIndex)
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

    getSessionTitle() {
        if ( !this.session || !this.session.t ) {
            return '';
        }
        return this.session.t
    }
    getSessionSections() {
        if ( !this.session || !this.session.sections ) {
            return []
        }
        return this.session.sections
    }

    switchViews( pushState = true) {
        if ( this.view === 'guide' ) {
            this.view = 'slideshow'
        } else {
            this.view = 'guide'
        }

        if ( pushState === true) {
            this.pushHistory({view: this.view})
        }
    }

    openMenu() {
        const menu = this.querySelector('#offCanvas')
        jQuery(menu).foundation('open')
    }

    render() {
        if ( this.showIndex ) {
            const containerClass = this.type === 'intensive' ? 'container-xsm' : 'container-sm'
            return html`
                <div class="course-index | bg-brand-gradient">
                    <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                    <div class="${containerClass}" data-max-width="750">
                        <div class="grid | grid-min-8rem gutter0">
                            ${this.zumeSessions.map((session, sessionNumber) => html`
                                <button
                                    class="card-btn | bg-white black m--2 gap--3"
                                    data-session-number=${sessionNumber}
                                    @click=${this.handleSessionLink}
                                >
                                    <h2 class="f-0 bold">Session</h2>
                                    <p class="f-3 bold lh-sm">${sessionNumber + 1}</p>
                                    <span class="icon zume-course brand-light f-3"></span>
                                </button>
                            `)}
                        </div>
                    </div>
                </div>
            `
        }

        /* If this is the overall presenter, then it would have a top bar, navigation buttons etc. as well */
        /* And also have a sidebar with the contents list in */
        return html`
            <nav class="stack | bg-white px-0 text-center | off-canvas position-left justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
                <div class="stack">
                    <div style="text-align:center;padding: 1em;">
                        <img src="${this.assetsPath}/ZumeLOGO.svg" width="150px" alt="Zume" >
                    </div>
                    <!-- Close button -->
                    <button class="close-button" aria-label="Close menu" type="button" data-close>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <!-- Menu -->
                    <a class="btn outline" href="${this.homeUrl}">${this.translations.home}</a>
                    <button class="btn d-flex align-items-center justify-content-center gap--4" data-open="language-menu-reveal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
                        ${this.languageCode}
                    </button>
                    <button class="btn" @click=${this.switchViews}>Switch Views</button>

                    <div class="stack-1 py-1">
                        ${this.zumeSessions.map((session, sessionNumber) => html`
                            <button
                                class="link session-link"
                                data-session-number="${sessionNumber}"
                                @click=${this.handleSessionLink}
                            >
                                ${session.t}
                            </button>
                        `)}
                    </div>
                </div>

                <div class="stack">
                    <button class="btn outline" @click=${this.getPreviousSession}>Back</button>
                    <button class="btn" @click=${this.getNextSession}>Next</button>
                </div>
            </nav>

            <span class="p-1 d-block position-relative z-1">
                <button id="hamburger-menu" class="nav-toggle show" @click=${this.openMenu}>
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="container"></div>
                ${
                    this.view === 'guide'
                    ? html`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`
                    : html`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`
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
