import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class DiscussSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-discuss"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide['left'][0]}</h2>
                                <span class="subtitle">${this.slide['length'] ?? ''}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide['right'])}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('discuss-slide', DiscussSlide);
