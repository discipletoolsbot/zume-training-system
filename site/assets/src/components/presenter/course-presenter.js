import { LitElement, html, css } from 'lit';

export class CoursePresenter extends LitElement {
    static get properties() {
        return {
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
            <div class="container"><button class="btn" @click=${this.switchViews}>Switch Views</button></div>
            ${
                this.view === 'guide'
                ? html`<course-guide title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-guide>`
                : html`<course-slideshow title="${this.getSessionTitle()}" .sections=${this.getSessionSections()}></course-slideshow>`
            }

            <div class="container-md | d-flex justify-content-between py-2">
                <button class="btn outline" @click=${this.getPreviousSession}>Back</button>
                <button class="btn" @click=${this.getNextSession}>Next</button>
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
