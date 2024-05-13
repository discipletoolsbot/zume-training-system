import { LitElement, html, css } from 'lit';

export class ProgressSlider extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --ps-primary-color: var(--primary-color, #7cb8fc)
            }
            .progress-bar {
                height: 20px;
                width: 100%;
                border-radius: 100px;
                border-width: 2px;
                border-style: solid;
                border-color: var(--ps-primary-color);
                overflow: hidden;
            }
            .progress-bar__slider {
                height: 100%;
                background-color: var(--ps-primary-color);
                width: var(--percentage);
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
                <div class="progress-bar__slider" style="--percentage:${this.percentage}%"></div>
            </div>
        `;
    }
}
customElements.define('progress-slider', ProgressSlider);
