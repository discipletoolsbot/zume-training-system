import { LitElement, html, css } from 'lit';

export class ProgressSlider extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --ps-primary-color: var(--primary-color, #7cb8fc);
                --ps-secondary-color: var(--secondary-color, #C1C1C1);
            }
            .progress-bar {
                height: 20px;
                width: 100%;
                border-radius: 100px;
                border: none;
                background-color: var(--ps-secondary-color);
            }
            .progress-bar__slider {
                height: 100%;
                width: var(--percentage);
                border-radius: 100px;
                background-color: var(--ps-primary-color);
                transition: width 100ms linear;
            }
        `
    ];
    static get properties() {
        return {
            percentage: { type: Number },
        };
    }

    render() {
        return html`
            <div class="progress-bar">
                <div class="progress-bar__slider" style="--percentage:${Number(this.percentage) > 100 ? '100' : this.percentage}%"></div>
            </div>
        `;
    }
}
customElements.define('progress-slider', ProgressSlider);
