import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export class DashCta extends LitElement {
    static get properties() {
        return {
            ctas: { type: Array, attribute: false },
        };
    }

    constructor() {
        super()
        this.allCtas = []
        this.ctas = []
        this.userId = zumeDashboard.user_profile.user_id
    }

    firstUpdated() {
        this.getCtas()
    }

    getCtas() {
        /* Get ctas from api */
        makeRequest('POST', 'user_ctas', { user_id: this.userId }, 'zume_system/v1' ).done( ( data ) => {
            const ctas = Object.values(data)

            this.Allctas = ctas

            /* Take the first 3 of the randomized list to display */
            this.ctas = this.shuffleArray(ctas).slice(0, 3)
        })
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    renderCta({ content, content_template }) {
        if (content_template === 'card') {
            return html`
                <div class="stack | card cta">
                    <h2 class="h5 text-center">${content.title}</h2>
                    <p>${content.description}</p>
                    <a href="${content.link}" class="btn light uppercase">${content.link_text}</a>
                </div>
            `
        }
    }

    render() {
        return html`
            <div class="stack">
                ${repeat(this.ctas, (cta) => cta.key, this.renderCta)}
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-cta', DashCta);
