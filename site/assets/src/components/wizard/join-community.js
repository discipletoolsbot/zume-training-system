import { LitElement, html } from 'lit';

export class JoinCommunity extends LitElement {
    static get properties() {
        return {
            hasNextStep: { type: Boolean },
            /**
             * Translation strings
             */
            t: { type: Object },
            loading: { type: Boolean, attribute: false },
            success: { type: Boolean, atrtibute: false },
        }
    }

    joinCommunity() {
        this.loading = true
        makeRequest('POST', 'log', { type: 'system', subtype: 'join_community' }, 'zume_system/v1/' )
            .done( ( data ) => {
                this.success = true
            })
            .always(() => {
                this.loading = false
                this.dispatchEvent(new CustomEvent('wizard:finish', { bubbles: true }))
            })
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
    }

    render() {
        if (this.hasNextStep && !this.loading && !this.success) {
          this.joinCommunity()
        }

        return html`
            <div class="container-md stack-2 center | py-2">
              <h1 class="text-center">${this.t.community_title}</h1>
              <p>${this.t.community_description}</p>
              <div class="switcher | training-path">
                <div class="stack | card | switcher-width-40">
                  <h2 class="f-1 text-center">${this.t.community_peer_title}</h2>
                  <img class="mx-auto h-6rem" src=${jsObject.images_url + "/Gather-A-Group-01.svg"} alt="Peer Mentoring">
                  <p class="mb-0">
                    ${this.t.community_peer_description}
                  </p>
                </div>
                <div class="stack | card | switcher-width-40">
                  <h2 class="f-1 text-center">${this.t.community_encouragement_title}</h2>
                  <img class="mx-auto h-6rem" src=${jsObject.images_url + "/coach-2guys.svg"}  alt="Free Tools">
                  <p class="mb-0">
                    ${this.t.community_encouragement_description}
                  </p>
                </div>
                <div class="stack | card | switcher-width-40">
                  <h2 class="f-1 text-center">${this.t.community_tools_title}</h2>
                  <img class="mx-auto h-6rem" src=${jsObject.images_url + "/JoinTraining.svg"} alt="Encouragement">
                  <p class="mb-0">
                    ${this.t.community_tools_description}
                  </p>
                </div>
              </div>
            </div>
            <div class="container-md center stack">
                ${
                    !this.success ? html`
                      <button class="btn large uppercase" @click=${this.joinCommunity}>
                        ${this.t.community_join_free}
                        ${this.loading === true ? html`<span class="loading-spinner active"></span>` : ''}
                      </button>
                    ` : ''
                }
                ${
                    this.success === true ? html`
                        <div class="stack">
                            <span class="banner success">
                                ${this.t.joined_community}
                            </span>
                        </div>
                    ` : ''
                }
                ${
                    this.success === false ? html`
                        <div class="stack">
                            <span class="banner warning">
                                ${this.t.error}
                            </span>
                        </div>
                    ` : ''
                }
                ${
                  this.success && this.hasNextStep ? html`
                    <button class="btn" @click=${this._sendDoneStepEvent}>
                      ${this.t.next}
                    </button>
                  ` : ''
                }
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-community', JoinCommunity);
