import { LitElement, html } from 'lit';

export class DashSidebarToggle extends LitElement {
    static get properties() {
        return {
            displayOn: { type: String },
        };
    }
    constructor() {
        super()
        this.displayOn = 'large'
    }

    toggleSidebar() {
        const event = new CustomEvent( 'toggle-dashboard-sidebar', { bubbles: true } )
        this.dispatchEvent(event)
    }

    render() {
        return html`
            <button class="btn f-0 light tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${zumeDashboard.translations.menu}</button>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-sidebar-toggle', DashSidebarToggle);
