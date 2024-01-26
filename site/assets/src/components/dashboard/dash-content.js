import { LitElement, html, css } from 'lit';

export class DashContent extends LitElement {
    static styles = [
        css`
            :host {
                display: grid;
                grid-template-areas: "header header"
                                     "main secondary";
                grid-template-columns: 1fr minmax(auto, 16rem);
                grid-template-rows: auto 1fr;
                height: 100%;
            }


            .dashboard__header {
                grid-area: header;
                background-color: var(--bg-color-main);
                border-block-end: 2px solid var(--border-color-main);
                padding: var(--s-0) var(--s-2);
                display: flex;
                justify-content: space-between;
                align-items: center;

                h1 {
                    margin-block-end: 0;
                }
            }

            .dashboard__main {
                grid-area: main;
                background-color: var(--bg-color-main);
            }

            .dashboard__secondary {
                grid-area: secondary;
                background-color: var(--bg-color-main);
                padding: var(--s-0);
            }
        `
    ];

    render() {
        return html`
            <div class="dashboard__header">
                <slot name="header"></slot>

                <button class="btn uppercase light" data-toggle="launch-course-panel">
                    ${zumeDashboard.translations.launch_course}
                </button>
                <div class="dropdown-pane" id="launch-course-panel" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true">
                    <ul>
                        <li><a class="menu-btn" href="<?php echo esc_url( zume_10_session_url() ) ?>"><span class="icon zume-course"></span>${zumeDashboard.translations.ten_session_course}</a></li>
                        <li><a class="menu-btn" href="<?php echo esc_url( zume_20_session_url() ) ?>"><span class="icon zume-course"></span>${zumeDashboard.translations.twenty_session_course}</a></li>
                        <li><a class="menu-btn" href="<?php echo esc_url( zume_intensive_session_url() ) ?>"><span class="icon zume-course"></span>${zumeDashboard.translations.three_day_intensive_course}</a></li>
                    </ul>
                </div>

            </div>

            <div class="dashboard__main">
                <slot name="main"></slot>
            </div>
            <!--END DEV SECTION -->

            <div class="dashboard__secondary">
                <slot name="secondary"></slot>
                <div class="stack | card cta">
                    <h2 class="h5 text-center">${zumeDashboard.translations.get_a_coach}</h2>
                    <p>Don't forget about our free coaching</p>
                    <a href="#" class="btn light uppercase">${zumeDashboard.translations.get_a_coach}</a>
                </div>
            </div>
        `;
    }
}
customElements.define('dash-content', DashContent);
