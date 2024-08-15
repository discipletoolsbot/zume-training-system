import { LitElement, html, css } from "lit"

export class PlayButton extends LitElement {

    static get properties() {
        return {
            size: { type: String, attribute: false },
        };
    }

    constructor() {
        super()

        const oneRem = 16
        this.minSize = 3 * oneRem
        this.percentage = 15.0 / 100.0
        this.maxSize = 8 * this.minSize
        this.size = this.maxSize

        this.widthObserver = this.widthObserver.bind(this)
    }

    firstUpdated() {
        this.resizeObserver = new ResizeObserver(this.widthObserver)

        this.resizeObserver.observe(this)
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.resizeObserver.disconnect()
    }
    widthObserver(entries) {
        for (const entry of entries) {
            if (entry.contentBoxSize) {
                this.size = entry.contentBoxSize[0].inlineSize * this.percentage

                if (this.size < this.minSize) {
                    this.size = this.minSize
                }
                if (this.size > this.maxSize) {
                    this.size = this.maxSize
                }
            }
        }
    }

    render() {
        return html`
            <div class="container" style="--play-button-size: ${this.size}px">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `
    }

    static styles = css`
        :host {
            --play-button-size: 3rem;
            --play-button-color: red;
            --play-button-hover-color: darkred;
            --play-button-highlight: white;

            width: 100%;
            height: 100%;
        }

        :host(:hover) .circle {
            transform: scale(1.1);
            background-color: var(--play-button-hover-color);
        }

        .container {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .circle {
            width: var(--play-button-size);
            height: var(--play-button-size);
            border-radius: 50%;
            background-color: var(--play-button-color);
            box-shadow: var(--play-button-shadow);

            display: flex;
            align-items: center;
            justify-content: center;

            transition: all 100ms linear;
        }

        .triangle {
          width: 0;
          height: 0;
          border-top: calc(var(--play-button-size) / 4.5) solid transparent;
          border-left: calc(var(--play-button-size) / 2.5) solid var(--play-button-highlight);
          border-bottom: calc(var(--play-button-size) / 4.5) solid transparent;
          margin-left: calc(var(--play-button-size) / 10);
        }
    `
}

window.customElements.define( 'play-button', PlayButton )