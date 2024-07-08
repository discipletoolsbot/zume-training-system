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
        };
    }
    firstUpdated() {
        jQuery(this.renderRoot).foundation();

        this.offCanvasId = 'informationOffCanvas' + this.id
        this.offCanvasSelector = '#' + this.offCanvasId
        this.loadScriptIntoFrame()
    }

    openMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        jQuery(menu).foundation('open')
    }
    closeMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        jQuery(menu).foundation('close')
    }

    loadScriptIntoFrame() {
        const scriptId = this.slide.script_id
        const lang_code = jsObject.language

        const url = new URL(location.href)
        const scriptUrl = new URL(url.origin)
        scriptUrl.pathname = [ lang_code, 'app', 'script' ].join('/')
        scriptUrl.searchParams.append('s', scriptId)

        this.scriptUrl = scriptUrl.href
    }

    maybeRemoveAutoplay(videoUrl) {
        if (!this.inContainer) {
            return videoUrl
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
                    class="btn icon-btn absolute top ${this.dir === 'rtl' ? 'left' : 'right'} z-1 m-0 bypass-nav-click d-flex gap--2"
                    @click=${this.openMenu}
                >
                    <span class="icon z-icon-info"></span><span>${jsObject.translations.view_script}</span>
                </button>

                <div class="widescreen flex-video">
                    <iframe src="${this.maybeRemoveAutoplay(this.slide['center'][0])}"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                    >
                    </iframe>
                </div>

                ${ false && this.showButtons === true ? html`
                     <!-- These buttons have no click handlers. They essentially give a space to allow the
                mouse click to trigger the click left/right side of screen event -->
                    <button
                        type="button"
                        class="btn icon-btn absolute middle left mx-0"
                    >
                        <img
                            src="${jsObject.images_url}/chevron.svg"
                            alt=${jsObject.translations.previous_slide}
                            class="svg white rotate-90 w-1rem h-1rem"
                        />
                    </button>
                    <button
                        type="button"
                        class="btn icon-btn absolute middle right mx-0"
                    >
                        <img
                            src="${jsObject.images_url}/chevron.svg"
                            alt=${jsObject.translations.next_slide}
                            class="svg white rotate--90 w-1rem h-1rem"
                        />
                    </button>
                ` : '' }
            </div>
            <div
                class="bg-white | information-flyout bypass-nav-click off-canvas ${this.dir === 'rtl' ? 'position-left' : 'position-right'}"
                id=${this.offCanvasId || "informationOffCanvas"}
                data-off-canvas
                data-transition="overlap"
            >
                <button class="close-btn | ms-auto m--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>

                <iframe
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
