import { LitElement, html } from 'lit';

export class CourseGuide extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            sections: { type: Array },
        };
    }

    render() {
        return html`
            <div class="container">
                <h1>${this.title}</h1>
                ${this.sections.map((section, i) => {
                    return html`
                        <course-section .section=${section}></course-section>
                    `
                })}
            </div>
        `
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('course-guide', CourseGuide);
