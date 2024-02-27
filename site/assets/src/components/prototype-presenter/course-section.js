import { LitElement, html, css } from 'lit';

export class CourseSection extends LitElement {
    static get properties() {
        return {
            section: { type: Object },
        };
    }

    constructor() {
        super()
    }

    render() {
        this.title = this.section.t ?? null
        this.description = this.section.d ?? null
        this.info = this.section.info ?? null
        this.duration = this.section.duration ?? null
        this.parts = this.section.parts ?? []

        return html`
            ${this.title !== null ? html`<h1>${this.title}</h1>` : ''}
            ${this.description !== null ? html`<p>${this.description}</p>` : ''}
            ${this.info !== null ? html`<p>${this.info}</p>` : ''}
            ${this.duration !== null ? html`<p>${this.duration}</p>` : ''}

            ${this.parts.map((part) =>
                html`<part-switcher .partData=${part}></part-switcher>`
            )}

        `;
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('course-section', CourseSection);
