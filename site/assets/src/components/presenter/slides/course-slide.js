import { LitElement, html } from 'lit';

export class CourseSlide extends LitElement {
    static get properties() {
        return {
            slide: { type: Object },
            id: { type: String },
            inContainer: { type: Boolean },
        };
    }

    constructor() {
        super()

        this.maxPercentage = 80
        this.inContainer = false

        this.resizeCallback = this.resizeCallback.bind(this)
    }

    connectedCallback() {
        super.connectedCallback()
        this.dir = document.querySelector('html').dir
        window.addEventListener('resize', this.resizeCallback)
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('resize', this.resizeCallback)
    }
    firstUpdated() {
        this.resizeSlide(window)
        this.fitContentToSlide('.activity-card')
        this.fitContentToSlide('.content-area__text')
    }
    resizeCallback(event) {
        this.resizeSlide(event.currentTarget)
    }
    fitContentToSlide(selector) {
        const contentArea = this.renderRoot.querySelector(selector)
        const slide = this.renderRoot.querySelector('.slides-card')

        if (!contentArea || !slide) {
            return
        }

        const contentAreaHeight = contentArea.getBoundingClientRect().height

        const parentElementTop = contentArea.parentElement.getBoundingClientRect().top
        const slideTop = slide.getBoundingClientRect().top
        const slideHeight = slide.getBoundingClientRect().height

        const spaceAvailable = slideHeight - ( parentElementTop - slideTop )

        const percentageOfSlideHeight = contentAreaHeight / spaceAvailable * 100

        if (percentageOfSlideHeight > this.maxPercentage) {
            /* CurrentFontRatio is hardcoded to match the ratio currently in presenter.scss as --font-size-ratio */
            const currentFontRatio = 2
            const newFontSize = currentFontRatio * this.maxPercentage / percentageOfSlideHeight
            contentArea.style.fontSize = `calc( var(--slide-unit) * ${newFontSize} )`
        }
    }
    resizeSlide(target) {
        const normalSlides = document.querySelectorAll('.slides-card')

        const videoSlides = document.querySelectorAll('.video-slide')

        const slides = [...normalSlides, ...videoSlides]

        const { innerWidth: screenWidth, innerHeight: screenHeight } = target

        const isScreenWiderThanSlide = this.inContainer
            ? screenWidth / screenHeight > 16/10
            : screenWidth / screenHeight > 16/9

        let slideHeight
        let slideWidth

        if (isScreenWiderThanSlide) {
            slideHeight = screenHeight
            slideWidth = screenHeight * 16 / 9

            if (this.inContainer && slideWidth > screenWidth * 90 / 100 + 12) {
                slideWidth = screenWidth * 90 / 100 + 12
                slideHeight = slideWidth * 9 / 16
            }

        } else {
            slideWidth = screenWidth

            if (this.inContainer) {
                slideWidth = screenWidth * 90 / 100 + 12
            }

            slideHeight = slideWidth * 9 / 16
        }

        const slideUnit = slideWidth / 100

        slides.forEach((slide) => {
            slide.style = `
                --slide-unit: ${slideUnit}px;
                --slide-height: ${slideHeight}px;
                --slide-width: ${slideWidth}px;
            `
        })
    }

    renderProgressBar() {
        let progress_bar = []
        let stage = []
        for (let i = 0; i < this.slide.progress_bar.length; i++) {
            const item = this.slide.progress_bar[i];
            if (item === false) {
                progress_bar.push(stage)
                progress_bar.push(false)
                stage = []
                continue
            }
            stage.push(item)
        }
        progress_bar.push(stage)

        return html`
            <div class="stage ${this.slide['key']}-bar">
                <div class="progress-bar-wrapper">
                    ${progress_bar.map((stage) => {
                        if ( !stage ) {
                            return html`<div class="progress-bar-divider"></div>`
                        }
                        return html`
                            <div class="progress-bar-stage">
                                ${stage.map((item) => html`
                                    <div class="progress-bar-item ${this.slide.key === item ? 'active' : ''}"></div>
                                `)}
                            </div>
                        `
                    })}
                </div>
            </div>
        `
    }

    renderContent(stack = [], boldFirst = false, boldAll = false) {
        return stack.map((item, i) => {
            if ((boldFirst && i === 0)) {
                return html`<p><strong>${item}</strong></p>`
            }
            if (Array.isArray(item)) {
                return html`
                    <ul class="bullets">
                        ${
                            item.map((listItem) => html`<li>${listItem}</li>`)
                        }
                    </ul>
                `
            }
            if (boldAll) {
                return html`<p><strong>${item}</strong></p>`
            }
            return html`<p>${item}</p>`
        })
    }

    render() {
        return html`
            <div class="slides-card">
                <div class="center"></div>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('course-slide', CourseSlide);