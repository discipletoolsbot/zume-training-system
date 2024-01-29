import { LitElement, html } from 'lit';

export class DashCta extends LitElement {

    render() {
        return html`
            <div class="stack | card cta">
                <h2 class="h5 text-center">${zumeDashboard.translations.get_a_coach}</h2>
                <p>Don't forget about our free coaching</p>
                <a href="#" class="btn light uppercase">${zumeDashboard.translations.get_a_coach}</a>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-cta', DashCta);
