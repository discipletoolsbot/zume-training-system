import { LitElement, html } from 'lit';

export class CourseSlideshow extends LitElement {
    static get properties() {
        return {
            sections: { type: Array },
            sectionIndex: { attribute: false },
            currentSlide: { attribute: false },
            index: { attribute: false },
        };
    }

    constructor() {
        super()
        this.reset();

        this.listenForKeyboard = this.listenForKeyboard.bind(this)
        this.listenForMouseClick = this.listenForMouseClick.bind(this)
    }

    reset() {
        this.sectionIndex = -1;
        this.currentSlide = null;
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('keydown', this.listenForKeyboard)
        document.addEventListener('mousedown', this.listenForMouseClick)
    }
    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener('keydown', this.listenForKeyboard)
        document.removeEventListener('mousedown', this.listenForMouseClick)
    }
    update(changedProperties) {
        if ( changedProperties.has('sections') ) {
            this.reset()
        }
        super.update(changedProperties)
    }

    nextSlide() {
        if ( this.sectionIndex >= this.sections.length - 1 ) {
            this.sectionIndex = this.sections.length - 1
            return
        }

        this.setSlide(this.sectionIndex + 1)
    }
    previousSlide() {
        if ( this.sectionIndex < 0 ) {
            this.sectionIndex = 0
        }

        this.setSlide(this.sectionIndex - 1)
    }
    leftSlide() {
        const dir = document.querySelector('html').dir
        if (dir === 'rtl') {
            this.nextSlide()
        } else {
            this.previousSlide()
        }
    }
    rightSlide() {
        const dir = document.querySelector('html').dir
        if (dir === 'rtl') {
            this.previousSlide()
        } else {
            this.nextSlide()
        }
    }
    listenForKeyboard(event) {
        if ( [ 'ArrowRight' ].includes(event.code) ) {
            this.rightSlide()
        }
        if ( ['Space'].includes(event.code) ) {
            this.nextSlide()
        }
        if ( [ 'ArrowLeft' ].includes(event.code) ) {
            this.leftSlide()
        }
        if (['Backspace'].includes(event.code)) {
            this.previousSlide()
        }
    }
    listenForMouseClick(event) {
        if (event.target.id === 'hamburger-menu') {
            return
        }
        const matcher = (target) => {
            return target.id === 'offCanvas' || target.classList.contains('js-off-canvas-overlay')
        }
        if (this.hasParent(event.target, matcher)
        ) {
            return
        }

        const { x, type, which } = event

        if ( type !== 'mousedown' || which !== 1 ) {
            return
        }

        const { innerWidth } = window

        const threshhold = 1 / 2 * innerWidth

        if ( x < threshhold ) {
            this.leftSlide()
        }

        if ( x > innerWidth - threshhold ) {
            this.rightSlide()
        }
    }

    hasParent(target, matcher) {
        let thisTarget = target
        const maxDepth = 50
        let i = 0
        while (thisTarget) {
            if (matcher(thisTarget)) {
                return true
            }
            thisTarget = thisTarget.parentElement

            i = i + 1
            if (i > maxDepth) {
                return false
            }
        }
        return false
    }

    setSlide(sectionIndex) {
        this.sectionIndex = sectionIndex
        const slide = this.sections[sectionIndex]
        this.currentSlide = slide
    }

    render() {
        if ( this.sectionIndex < 0 ) {
            this.setSlide(0)
        }
        return html`
            <div class="cover-page">
                <div>
                    <slide-switcher .slide=${this.currentSlide}></slide-switcher>
                </div>
            </div>
        `;
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}
customElements.define('course-slideshow', CourseSlideshow);
