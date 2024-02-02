import { LitElement, html } from 'lit';
import { DashBoard } from './dash-board';

export class DashPracticing extends LitElement {

    constructor() {
        super()
        this.routeName = 'practicing'
        this.routes = DashBoard.childRoutesOf('practicing')
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Practicing</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main p-1">
                    <div class="nav-grid">
                        ${this.routes.map((route) => html`
                            <grid-link
                                href=${route.pattern}
                                text=${zumeDashboard.translations[route.translation] || ''}
                                icon=${route.icon}
                            >
                            </grid-link>
                        `)}
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
customElements.define('dash-practicing', DashPracticing);
