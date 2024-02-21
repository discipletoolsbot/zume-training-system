import { LitElement, html } from 'lit';

export class DashHeaderRight extends LitElement {
    firstUpdated() {
        const offset = this.offsetTop
        this.style.top = offset + 'px'
    }

    render() {
        return html`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-header-right', DashHeaderRight);
