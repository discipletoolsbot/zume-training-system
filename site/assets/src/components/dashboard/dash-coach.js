import { html } from 'lit';
import { DashPage } from './dash-page';
import { Wizards } from '../wizard/wizard-constants';

export class DashCoach extends DashPage {
    static get properties() {
      return {
        showTeaser: { type: Boolean },
        coaches: { type: Array, attribute: false },
      };
    }

    constructor() {
      super()
      this.coaches = Object.values(jsObject.profile.coaches) || []
    }

    getACoach() {
      this.dispatchEvent(new CustomEvent( 'open-wizard', { bubbles: true, detail: { type: Wizards.getACoach } } ))
    }

    render() {
      console.log(this.coaches)
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_coach}</h1>
                </div>
                <dash-header-right></dash-header-right>

              <div class="dashboard__main content p-2">
                  ${
                      this.showTeaser ? html`
                          <div class="dash-menu__list-item">
                            <div class="dash-menu__icon-area | stack--5">
                              <span class="icon z-icon-locked dash-menu__list-icon"></span>
                            </div>
                            <div class="dash-menu__text-area | switcher | switcher-width-20">
                              <div>
                                <h3 class="f-1 bold uppercase">${jsObject.translations.get_a_coach}</h3>
                                <p>${jsObject.translations.get_a_coach_explanation}</p>
                              </div>
                              <button class="dash-menu__view-button btn tight" @click=${this.getACoach}>
                                ${jsObject.translations.get_a_coach}
                              </button>
                            </div>
                          </div>
                      ` : ''
                  }
                  ${
                      !this.showTeaser && this.coaches.length === 0 ? html`
                          <p>
                            ${jsObject.translations.connecting_with_coach}
                          </p>
                          <p>
                            ${jsObject.translations.wait_for_coach}
                          </p>
                      ` : ''
                  }
                  ${
                      !this.showTeaser && this.coaches.length > 0 ?
                          this.coaches.map((coach) => html`
                              <div class="card stack">
                                <h3>${coach.name}</h3>
                                ${
                                  coach.communication_apps.length ? html`
                                    <ul class="stack">
                                      ${
                                        coach.communication_apps.includes('email') ? html`
                                          <li>Email: <a href="mailto:${coach.email}">${coach.email}</a></li>
                                        ` : ''
                                      }
                                      ${
                                        coach.communication_apps.includes('phone') ? html`
                                          <li>Phone: ${coach.phone}</li>
                                        ` : ''
                                      }
                                      ${coach.communication_apps.map((app) => {
                                        if (app === 'signal') {
                                          return html`
                                            <li><a class="btn light uppercase" href="sgnl://signal.me/#p/${coach.signal}">${jsObject.translations.signal}</a></li>
                                          `
                                        }
                                        if (app === 'telegram') {
                                          return html`
                                            <li><a class="btn light uppercase" href="https://t.me/${coach.telegram}" target="_blank">${jsObject.translations.telegram}</a></li>
                                          `
                                        }
                                        if (app === 'whatsapp') {
                                          return html`
                                            <li><a class="btn light uppercase" href="https://wa.me/${coach.whatsapp}" target="_blank">${jsObject.translations.whatsapp}</a></li>
                                          `
                                        }
                                        if (app === 'messenger') {
                                          return html`
                                            <li><a class="btn light uppercase" href="https://m.me/${coach.messenger}" target="_blank">${jsObject.translations.messenger}</a></li>
                                          `
                                        }
                                      })}
                                    </ul>
                                  ` : ''
                                }

                              </div>
                          `)
                      : ''
                  }
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
