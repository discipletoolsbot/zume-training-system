import { LitElement, html } from 'lit';

export class CourseSlideshow extends LitElement {
    static get properties() {
        return {
            sections: { type: Array },
            slideKey: { type: String },
            sectionIndex: { attribute: false },
            currentSlide: { attribute: false },
        };
    }

    constructor() {
        super()
        this.reset()

        this.sections = []
        this.slideKey = ''

        this.listenForKeyboard = this.listenForKeyboard.bind(this)
        this.listenForMouseClick = this.listenForMouseClick.bind(this)

        const dir = document.querySelector('html').getAttribute('dir')

        this.isRtl = dir === 'rtl'

        this.nextSlide = this.nextSlide.bind(this)
    }

    reset() {
        this.sectionIndex = -1;
        this.currentSlide = null;
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('keydown', this.listenForKeyboard)
        document.addEventListener('mousedown', this.listenForMouseClick)
        document.addEventListener('next-slide', this.nextSlide)
    }
    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener('keydown', this.listenForKeyboard)
        document.removeEventListener('mousedown', this.listenForMouseClick)
        document.removeEventListener('next-slide', this.nextSlide)
    }
    update(changedProperties) {
        if ( changedProperties.has('sections') ) {
            this.reset()
        }
        if (changedProperties.has('slideKey') && this.slideKey !== '') {
            const slideIndex = this.sections.findIndex(({key}) => key === this.slideKey)

            this.updateSlide(slideIndex)
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
        if (this.isRtl) {
            this.nextSlide()
        } else {
            this.previousSlide()
        }
    }
    rightSlide() {
        if (this.isRtl) {
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
            return target.id === 'offCanvas'
                || target.classList.contains('js-off-canvas-overlay')
                || target.classList.contains('bypass-nav-click')
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

        const threshhold = this.isRtl ? 1 / 4 * innerWidth : 1 / 4 * innerWidth

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

    setSlide(sectionIndex, sendEvent = true) {
        const slide = this.sections[sectionIndex]
        if (sendEvent && slide) {
            this.dispatchEvent(new CustomEvent('set-slide', { detail: { key: slide.key } }))
        }
    }
    updateSlide(sectionIndex) {
        if (sectionIndex === -1) {
            return
        }
        this.sectionIndex = sectionIndex
        const slide = this.sections[sectionIndex]
        this.currentSlide = slide
    }

    isFirstSlide() {
        return this.sectionIndex === 0
    }
    isSecondSlide() {
        return this.sectionIndex === 1
    }
    isLastSlide() {
        return this.sectionIndex === this.sections.length - 1
    }

    render() {
        if ( this.sectionIndex < 0 ) {
            this.setSlide(0)
        }
        return html`
            <div class="cover-page course-slideshow" data-index=${this.sectionIndex}>
                <div>
                    <slide-switcher .slide=${this.currentSlide} showControls></slide-switcher>
                </div>
                <div class="visual-indicator left ${this.isRtl && this.isFirstSlide() || this.isSecondSlide() ? 'show' : ''} ${!this.isRtl && this.isFirstSlide() || this.isRtl && this.isLastSlide() ? 'off' : ''}">
                    <img
                        src="${jsObject.images_url}/chevron.svg"
                        alt=${jsObject.translations.previous_slide}
                        class="svg white rotate-90"
                    />
                </div>
                <div class="visual-indicator right ${!this.isRtl && this.isFirstSlide() || this.isSecondSlide() ? 'show' : ''} ${this.isRtl && this.isFirstSlide() || !this.isRtl && this.isLastSlide() ? 'off' : ''}">
                    <img
                        src="${jsObject.images_url}/chevron.svg"
                        alt=${jsObject.translations.next_slide}
                        class="svg white rotate--90"
                    />
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
