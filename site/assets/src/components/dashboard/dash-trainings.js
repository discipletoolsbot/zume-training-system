import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';

export class DashTrainings extends DashPage {
    static get properties() {
        return {
            loading: { type: Boolean, attribute: false },
            commitments: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.loading = true
        this.route = DashBoard.getRoute('my-training')
    }

    firstUpdated() {
        super.firstUpdated()
    }

    updated() {
        jQuery(document).foundation();
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="d-flex gap-0">
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-trainings', DashTrainings);
