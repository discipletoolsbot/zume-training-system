import { LitElement, html } from 'lit';

export class CourseSlideshow extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            sections: { type: Array },
            sectionIndex: { attribute: false },
            partIndex: { attribute: false },
            currentSlide: { attribute: false },
            index: { attribute: false },
        };
    }

    constructor() {
        super()
        this.sectionIndex = -1
        this.partIndex = -1
        this.currentSlide = null
        this.index = []

        this.listenForKeyboard = this.listenForKeyboard.bind(this)
        this.listenForMouseClick = this.listenForMouseClick.bind(this)
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

    setupIndex() {
        if ( !this.sections ) {
            return
        }
        this.index = this.sections.map(section => {
            if ( !section.parts ) {
                return 0
            }
            return section.parts.length
        });
    }

    nextSlide() {
        if ( this.sectionIndex > this.sections.length - 1 ) {
            this.sectionIndex = this.sections.length - 1
        }

        /* If there are no parts, or we are at the last part */
        /* Move to the next section */
        if ( this.index[this.sectionIndex] === 0 || this.index[this.sectionIndex] === this.partIndex + 1 ) {
            if ( this.sectionIndex === this.sections.length - 1 ) {
                return
            }
            this.setSlide(this.sectionIndex + 1, -1)
            return
        }

        /* If there are parts move the parts forwards */
        if ( this.index[this.sectionIndex] > 0 ) {
            this.setSlide(this.sectionIndex, this.partIndex + 1)
            return
        }
    }
    previousSlide() {
        if ( this.sectionIndex < 0 ) {
            this.sectionIndex = 0
        }

        /* If there are no parts or we are at part -1 */
        /* Go back */
        if ( this.index[this.sectionIndex] === 0 || this.partIndex === -1 ) {
            if ( this.sectionIndex === 0 ) {
                return
            }
            const lastPartIndexOfPreviousSection = this.index[this.sectionIndex - 1] - 1
            this.setSlide(this.sectionIndex - 1, lastPartIndexOfPreviousSection)
            return
        }

        /* If there are parts move the parts backwards */
        this.setSlide(this.sectionIndex, this.partIndex - 1)
    }
    listenForKeyboard(event) {
        if ( [ 'Space', 'ArrowRight' ].includes(event.code) ) {
            this.nextSlide()
        }
        if ( [ 'Backspace', 'ArrowLeft' ].includes(event.code) ) {
            this.previousSlide()
        }
    }
    listenForMouseClick(event) {
        const { x } = event
        const { innerWidth } = window

        const threshhold = 10 / 100 * innerWidth + 80

        if ( x < threshhold ) {
            this.querySelector('.clickable-area.back').classList.add('visible')
            this.previousSlide()
        }

        if ( x > innerWidth - threshhold ) {
            this.querySelector('.clickable-area.forward').classList.add('visible')
            this.nextSlide()
        }
    }

    setSlide(sectionIndex, partIndex) {
        this.sectionIndex = sectionIndex
        this.partIndex = partIndex
        if ( partIndex < 0 ) {
            const part = this.sections[sectionIndex]
            this.currentSlide = html`<section-part .part=${part}></section-part>`
        } else {
            const part = this.sections[sectionIndex].parts[partIndex]
            this.currentSlide = html`<part-switcher .part=${part}></part-switcher>`
        }
    }

    render() {
        if ( this.index.length === 0 ) {
            this.setupIndex()
        }
        if ( this.sectionIndex < 0 ) {
            this.setSlide(0,-1)
        }
        return html`
            <div class="text-center">
                <div class="container">
                    <h2>${this.title}</h2>
                    ${this.currentSlide}
                    <div class="fixed left right bottom d-flex justify-content-between py-2">
                        <button class="btn outline light" @click=${this.previousSlide}>Back</button>
                        <button class="btn  light" @click=${this.nextSlide}>Next</button>
                    </div>
                </div>
            </div>


            <div class="clickable-area back">
                <div class="absolute top bottom left right bg-gray-500 opacity-50"></div>
                <span class="absolute middle center brand f-3">🡰</span>
            </div>
            <div class="clickable-area forward">
                <div class="absolute top bottom left right bg-gray-500 opacity-50"></div>
                <span class="absolute middle center brand f-3">🡲</span>
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
