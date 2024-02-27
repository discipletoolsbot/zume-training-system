import { LitElement, html } from 'lit';

export class CourseSlide extends LitElement {
    static get properties() {
        return {
            slide: { type: Object },
        };
    }

    renderContent(stack = [], boldFirst = false, boldAll = false) {
        return stack.map((item, i) => {
            if ((boldFirst && i === 0) || boldAll) {
                return html`<p><strong>${item}</strong></p>`
            }
            if (Array.isArray(item)) {
                return html`
                    <ul role="list">
                        ${
                            item.map((listItem) => html`<li>${listItem}</li>`)
                        }
                    </ul>
                `
            }
            return html`<p>${item}</p>`
        })
    }

    render() {
        return html`
            <div class="center"></div>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('course-slide', CourseSlide);