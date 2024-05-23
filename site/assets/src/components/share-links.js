import { LitElement, html } from 'lit';

export class ShareLinks extends LitElement {
    webShareSupported = window.navigator.share ? true : false
    clipboardSupported = window.navigator.clipboard ? true : false

    static get properties() {
        return {
            url: { type: String },
            title: { type: String },
            t: { type: Object },
            alwaysShow: { type: Boolean },
            shareFeedback: { attribute: false },
            copyFeedback: { attribute: false },
        };
    }

    constructor() {
        super()

        this.shareFeedback = ''
        this.copyFeedback = ''
    }

    share() {
       navigator
        .share({
          title: this.title,
          url: this.url,
          text: title,
        })
        .then(() => {
          this.shareFeedback = this.t.share_feedback

          setTimeout(() => {
            this.shareFeedback = '';
          }, 3000);
        })
        .catch((error) => console.error('Error sharing', error));
    }

    copyLink(event) {
      event.stopImmediatePropagation()
      navigator.clipboard
        .writeText(this.url)
        .then(() => {
          this.copyFeedback = this.t.copy_feedback;

          setTimeout(() => {
            this.copyFeedback = '';
          }, 3000);
        })
        .catch((error) => console.error(error));
    }

    noOptionsAvailable() {
        return !this.clipboardSupported && !this.webShareSupported;
    }

    render() {
        return html`
            <div id="share" tabindex="-1" class="stack--2">
              ${ this.noOptionsAvailable() ? html`
                  <div class="stack--2">
                    <p>${this.t.copy_and_share_text}</p>
                    <p><code>${this.url}</code></p>
                  </div>
              ` : html`
                  <div :class="cluster gap--1">
                    ${ this.webShareSupported ? html`
                        <div class="position-relative">
                          <button class="btn light uppercase" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length ? '' : 'empty'}>${this.shareFeedback}</p>
                        </div>
                    ` : ''}
                    ${ this.clipboardSupported ? html`
                        <div class="stack--2">
                          ${
                            this.alwaysShow ? html`<p><code>${this.url}</code></p>` : ''
                          }
                          <div class="position-relative fit-content mx-auto">
                            <button class="btn light uppercase fit-content mx-auto" @click=${this.copyLink}>
                              <!-- Link icon -->
                              <span>${this.t.copy_link}</span>
                            </button>
                            <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length ? '' : 'empty'}>${this.copyFeedback}</p>
                          </div>
                        </div>
                    ` : ''}
                  </div>
              ` }


            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('share-links', ShareLinks);
