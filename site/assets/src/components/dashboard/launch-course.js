import { LitElement, html, css } from 'lit';

export class LaunchCourse extends LitElement {

    constructor() {
        super()

        const html = document.querySelector('html')
        const dir = html.dataset.dir

        this.isRtl = dir === 'rtl'
    }

    updated() {
        jQuery(document).foundation();
    }

    render() {
        return html`
            <button class="btn uppercase light tight" data-toggle="launch-course-panel">
                ${zumeDashboard.translations.launch_course}
            </button>
            <div
                class="dropdown-pane"
                id="launch-course-panel"
                data-dropdown
                data-auto-focus="true"
                data-close-on-click="true"
                data-position="bottom"
                data-alignment=${this.isRtl ? 'right' : 'left'}
            >
                <ul>
                    <li><a class="menu-btn" href="${zumeDashboard.urls.launch_ten_session_course}"><span class="icon zume-course"></span>${zumeDashboard.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn" href="${zumeDashboard.urls.launch_twenty_session_course}"><span class="icon zume-course"></span>${zumeDashboard.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn" href="${zumeDashboard.urls.launch_intensive_session_course}"><span class="icon zume-course"></span>${zumeDashboard.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('launch-course', LaunchCourse);
