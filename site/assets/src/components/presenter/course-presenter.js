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
            lessonIndex: { attribute: false },
            view: { attribute: false },
            linkNodes: { attribute: false },
        };
    }

    constructor() {
        super()

        const url = new URL(window.location.href)
        if ( url.searchParams.has('session') ) {
            const sessionIndex = Number(url.searchParams.get('session'))
            if ( Number.isInteger(sessionIndex) ) {
                this.lessonIndex = sessionIndex - 1
            } else {
                this.lessonIndex = 0
            }
        } else {
            this.lessonIndex = 0
        }
        this.changeSession(this.lessonIndex, false)

        if ( url.searchParams.has('view') ) {
            const view = url.searchParams.get('view')
            if ( courseViews.includes(view) ) {
                this.view = view
            }
        } else {
            this.view = 'slideshow'
        }

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

    handleSessionLink(event) {
        const link = event.target
        const sessionNumber = Number(link.dataset.sessionNumber)
        this.lessonIndex = sessionNumber
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

    changeSession(index, pushState = true) {
        let thisIndex = index
        if ( index < 0 ) {
            thisIndex = 0
        }
        if ( index > zumeSessions.length - 1 ) {
            thisIndex = zumeSessions.length - 1
        }
        this.lessonIndex = thisIndex
        this.session = zumeSessions[thisIndex]

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
        const sessionIndex = url.searchParams.has('session') ? Number(url.searchParams.get('session')) : null
        const view = url.searchParams.get('view')

        if ( Number.isInteger(sessionIndex) ) {
            this.lessonIndex = sessionIndex - 1
            this.changeSession(this.lessonIndex, false)
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

    render() {
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
                        ${zumeSessions.map((session, sessionNumber) => html`
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
                <button id="hamburger-menu" class="nav-toggle show">
                    <span class="hamburger brand"></span>
                </button>
            </span>

            <div class="container"></div>
            ${
                this.view === 'guide'
                ? html`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`
                : html`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`
            }

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
