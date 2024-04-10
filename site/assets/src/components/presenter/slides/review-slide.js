import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class ReviewSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-review"></span>
                            </div>
                            <h2 class="title">${this.slide['left'][0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide['right'], false, true)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('review-slide', ReviewSlide);
