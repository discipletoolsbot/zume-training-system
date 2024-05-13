import { html } from 'lit';
import { DashPage } from './dash-page';

export class DashCoach extends DashPage {

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_coach}</h1>
                </div>
                <dash-header-right></dash-header-right>

              <div class="dashboard__main p-2">
                  <div class="container-inline">
                    <div class="dash-menu__list-item">
                      <div class="dash-menu__icon-area | stack--5">
                        <span class="icon zume-locked dash-menu__list-icon"></span>
                      </div>
                      <div class="dash-menu__text-area | switcher | switcher-width-20">
                        <div>
                          <h3 class="f-1 bold uppercase">${jsObject.translations.get_a_coach}</h3>
                          <p>${jsObject.translations.get_a_coach_explanation}</p>
                        </div>
                        <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                          ${jsObject.translations.get_a_coach}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-coach', DashCoach);
