import { LitElement, html } from 'lit';

export class ProgressCircle extends LitElement {
    static get properties() {
        return {
            radius: { type: Number},
            lineWidth: { type: Number},
            percent: { type: Number},
        };
    }

    constructor() {
        super()
        this.radius = 100
        this.lineWidth = 10
        this.percent = 30
    }

    width() {
        return this.radius * 2 + this.lineWidth
    }

    widthPx() {
        return this.appendPx( this.width() )
    }

    center() {
        return this.width() / 2
    }

    circumference() {
        return this.radius * 2 * Math.PI
    }

    circumferencePx() {
        return this.appendPx( this.circumference() )
    }

    appendPx( number ) {
        return `${number}px`
    }

    rotate(degree) {
        return `rotate(${degree}, ${this.center()}, ${this.center()})`
    }

    render() {
        return html`
            <div
                class="progress-circle"
                style="--percent: ${this.percent}; --width: ${this.widthPx()}; --circ: ${this.circumferencePx()}"
            >
                <svg class="svg-wrapper">
                    <circle
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                    >
                    </circle>
                    <circle
                        class="bar"
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                        transform="${this.rotate(-90)}"
                    >
                    </circle>
                </svg>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('progress-circle', ProgressCircle);
