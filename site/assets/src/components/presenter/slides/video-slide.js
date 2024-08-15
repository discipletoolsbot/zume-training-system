import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class VideoSlide extends CourseSlide {
    static get properties() {
        return {
            slide: { type: Object },
            showButtons: { type: Boolean },
            id: { type: String },
            scriptUrl: { type: String, attribute: false },
            offCanvasId: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
        };
    }
    connectedCallback() {
        super.connectedCallback()

        this.handleLoad = this.handleLoad.bind(this)
    }
    async firstUpdated() {
        jQuery(this.renderRoot).foundation();

        this.offCanvasId = 'informationOffCanvas' + this.id
        this.iframeId = 'iframe' + this.id
        this.offCanvasSelector = '#' + this.offCanvasId

        await this.loadScriptIntoFrame()
    }

    openMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        jQuery(menu).foundation('open')
    }
    closeMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        jQuery(menu).foundation('close')
    }

    async loadScriptIntoFrame() {
        this.loading = true
        const scriptId = this.slide.script_id
        const lang_code = jsObject.language

        const url = new URL(location.href)
        const scriptUrl = new URL(url.origin)
        scriptUrl.pathname = [ lang_code, 'app', 'script' ].join('/')
        scriptUrl.searchParams.append('s', scriptId)


        await this.updateComplete

        const iframe = this.renderRoot.querySelector(`#${this.offCanvasId} iframe`)
        if (iframe) {
            iframe.onload = this.handleLoad
        } else {
            console.error('no iframe to attach onload to')
        }

        this.scriptUrl = scriptUrl.href
    }
    handleLoad() {
        this.loading = false
    }

    maybeRemoveAutoplay(videoUrl) {
        if (!this.inContainer) {
            return videoUrl
        }

        if (!videoUrl) {
            return ''
        }

        const url = new URL(videoUrl)

        url.searchParams.delete('autoplay')

        return url.href
    }

    render() {
        return html`
            <div class="video-slide">

                <button
                    type="button"
                    class="btn tight outline align-items-center absolute top ${this.dir === 'rtl' ? 'left' : 'right'} z-1 m--1 bypass-nav-click d-flex gap--2"
                    @click=${this.openMenu}
                >
                    <span class="icon z-icon-info"></span>
                    <span class="script-button__text">${jsObject.translations.view_script}</span>
                </button>

                <div class="widescreen flex-video">
                    <iframe src="${this.maybeRemoveAutoplay(this.slide['center'][0])}"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                    >
                    </iframe>
                </div>
            </div>
            <div
                class="bg-white | information-flyout bypass-nav-click off-canvas ${this.dir === 'rtl' ? 'position-left' : 'position-right'}"
                id=${this.offCanvasId || "informationOffCanvas"}
                data-off-canvas
                data-transition="overlap"
            >
                <div class="ms-auto absolute ${this.dir === 'rtl' ? 'left' : 'right'} top">
                    <button class="close-btn | my--2 mx-1 f-0" aria-label=${jsObject.translations.close} type="button" data-close>
                        <span class="icon z-icon-close"></span>
                    </button>
                </div>
                ${
                    this.loading ? html`
                        <div class="cover-page">
                            <div class="center"><span class="loading-spinner active"></span></div>
                        </div>
                    ` : ''
                }
                <iframe
                    id=${this.iframeId || 'iframe'}
                    src=${this.scriptUrl || ''}
                    frameborder="0"
                    width="100%"
                >
                </iframe>
            </div>
        `;
    }
}
customElements.define('video-slide', VideoSlide);
