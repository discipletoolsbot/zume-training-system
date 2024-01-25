import { LitElement, html } from 'lit';

/**
 * This highest level of the dashboard should mostly be focussed on the routing
 * for the main area and the title area.
 *
 * The sidebar should react to the state of their journey as well as indicate where they currently are.
 *
 * The secondary area should have the correct CTA for either their journey or their current page.
 */
export class DashBoard extends LitElement {

    render() {
        return html`
            <div class="dashboard">

            <div class="dashboard__sidebar">
                <ul class="stack-2 | progress-menu accordion-menu" data-accordion-menu data-submenu-toggle="true">
                    <li class="menu-section">
                        <a href="#" class="menu-section__title menu-btn">
                            <span class="icon zume-start brand-light"></span>
                            ${zumeDashboard.translations.getting_started}
                        </a>
                        <progress-circle percent="66" radius="12"></progress-circle>

                        <ul class="nested is-active">
                            <li><a class="menu-btn" href="#" aria-disabled="true" data-completed="true"><span class="icon zume-profile brand-light"></span> <span>${zumeDashboard.translations.set_profile}</span></a><span class="icon zume-check-mark success"></span></li>
                            <li><a class="menu-btn" href="#" aria-disabled="true" data-completed="true"><span class="icon zume-start-group brand-light"></span><span>${zumeDashboard.translations.plan_a_training}</span></a><span class="icon zume-check-mark success"></span></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-coach brand-light"></span><span>${zumeDashboard.translations.get_a_coach}</span></a><span class="icon zume-check-mark success"></span></li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <a href="#" class="menu-section__title menu-btn"><span class="icon zume-training brand-light"></span>${zumeDashboard.translations.training}</a>
                        <ul class="nested is-active">
                            <li><a class="menu-btn" href="#"><span class="icon zume-progress brand-light"></span><span>${zumeDashboard.translations.my_progress}</span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-group brand-light"></span><span>${zumeDashboard.translations.my_training}</span></a></li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <a href="#" class="menu-section__title menu-btn"><span class="icon zume-practicing brand-light"></span>${zumeDashboard.translations.practicing}</a>
                        <ul class="nested">
                            <li><a class="menu-btn" href="#"><span class="icon zume-tools brand-light"></span><span>${zumeDashboard.translations.my_tools}</span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-plans brand-light"></span><span>${zumeDashboard.translations.my_plans}</span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-churches brand-light"></span><span>${zumeDashboard.translations.my_churches}</span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-location brand-light"></span><span>${zumeDashboard.translations.my_maps}</span></a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="dashboard__titlebar">
                <h1 class="h3">Title here</h1>
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
            </div>
            <!--END DEV SECTION -->

            <div class="dashboard__secondary">
                <div class="stack | card cta">
                    <h2 class="h5 text-center">${zumeDashboard.translations.get_a_coach}</h2>
                    <p>Don't forget about our free coaching</p>
                    <a href="#" class="btn light uppercase">${zumeDashboard.translations.get_a_coach}</a>
                </div>
            </div>

        </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-board', DashBoard);
