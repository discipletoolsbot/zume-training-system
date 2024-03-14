import { LitElement, html } from 'lit';

export class CourseSlide extends LitElement {
    static get properties() {
        return {
            slide: { type: Object },
        };
    }

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('resize', this.resizeCallback)
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('resize', this.resizeCallback)
    }
    firstUpdated() {
        this.resizeCallback(null, window)
    }
    resizeCallback(event, target = null) {
        const normalSlides = document.querySelectorAll('.slides-card')

        const videoSlides = document.querySelectorAll('.video-slide')

        const slides = [...normalSlides, videoSlides]

        const currentTarget = target || event.currentTarget
        const { innerWidth: W, innerHeight: H } = currentTarget

        if ( W/H > 16/9 ) {
            slides.forEach((slide) => {
                slide.style = `--slide-unit: ${16 / 9 * H / 100}px`
            })
        } else {
            slides.forEach((slide) => {
                slide.style = `--slide-unit: ${W / 100}px`
            })
        }

    }

    renderProgressBar() {
        let progress_bar = []
        let stage = []
        for (let i = 0; i < this.slide.progress_bar.length; i++) {
            const item = this.slide.progress_bar[i];
            if (!item) {
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
                    <ul role="list">
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