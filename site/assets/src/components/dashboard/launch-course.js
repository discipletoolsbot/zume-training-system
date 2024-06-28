import { LitElement, html } from 'lit';

export class LaunchCourse extends LitElement {
    static get properties() {
        return {
            translations: { type: Object },
            urls: { type: Object },
            position: { type: String },
            asLink: { type: Boolean },
        };
    }

    constructor() {
        super()

        if ( typeof jsObject !== 'undefined' ) {
            this.translations = jsObject.translations
            this.urls = jsObject.urls
        }

        this.position = 'bottom'

        const html = document.querySelector('html')
        const dir = html.dataset.dir

        this.isRtl = dir === 'rtl'
    }

    updated() {
        jQuery(this.renderRoot).foundation();
    }

    render() {
        return html`
            <button class="${this.asLink ? 'btn dark tight nav__button' : ' btn  tight'}" data-toggle="launch-course-panel">
                ${this.translations.launch_course}
            </button>
            <div
                class="dropdown-pane"
                id="launch-course-panel"
                data-dropdown
                data-auto-focus="true"
                data-close-on-click="true"
                data-position=${this.position}
                data-alignment=${this.isRtl ? 'right' : 'left'}
            >
                <ul>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_ten_session_course}"><span class="icon z-icon-course"></span>${this.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_twenty_session_course}"><span class="icon z-icon-course"></span>${this.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_intensive_session_course}"><span class="icon z-icon-course"></span>${this.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('launch-course', LaunchCourse);
