import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'

export class CourseGuide extends LitElement {
    static get properties() {
        return {
            sections: { type: Array },
        };
    }

    render() {
        return html`
            <div class="course-guide">
                <div class="stack | py-4 snap-content" data-outline-slides>
                    ${repeat(this.sections, (slide) => slide.key, (slide) => html`
                            <div class="slide-switcher">
                                <slide-switcher
                                    .slide=${slide}
                                    ?inContainer=${true}
                                ></slide-switcher>
                            </div>
                        `
                    )}
                </div>
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
