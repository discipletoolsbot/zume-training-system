import { LitElement, html, css } from 'lit';

export class CoursePresenter extends LitElement {
    static get properties() {
        return {
            languageCode: { type: String },
            homeUrl: { type: String },
            assetsPath: { type: String },
            translations: { type: Object },
            lessonIndex: { attribute: false },
            view: { attribute: false },
        };
    }

    constructor() {
        super()
        this.lessonIndex = 0
        this.changeSession(this.lessonIndex)
        this.view = 'slideshow'
    }

    getNextSession() {
        this.lessonIndex += 1
        this.changeSession(this.lessonIndex)
    }
    getPreviousSession() {
        this.lessonIndex -= 1
        this.changeSession(this.lessonIndex)
    }

    changeSession(index) {
        if ( index < 0 ) {
            this.lessonIndex = 0
            this.session = zumeSessions[0]
            return
        }
        if ( index > zumeSessions.length - 1 ) {
            this.lessonIndex = zumeSessions.length - 1
            this.session = zumeSessions[zumeSessions.length - 1]
            return
        }
        this.session = zumeSessions[index]
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

    switchViews() {
        if ( this.view === 'guide' ) {
            this.view = 'slideshow'
        } else {
            this.view = 'guide'
        }
    }

    render() {
        /* If this is the overall presenter, then it would have a top bar, navigation buttons etc. as well */
        /* And also have a sidebar with the contents list in */
        return html`
            <nav class="stack | bg-white px-0 text-center | off-canvas position-left" id="offCanvas" data-off-canvas data-transition="overlap">
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

                <button class="btn outline" @click=${this.getPreviousSession}>Back</button>
                <button class="btn" @click=${this.getNextSession}>Next</button>
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
