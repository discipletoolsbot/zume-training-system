import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class OverviewSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <img src="https://placehold.co/60x60/png" />
                            </div>
                            <h2 class="title">${this.slide['left'][0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            ${this.renderContent(this.slide['right'], false, true)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('overview-slide', OverviewSlide);
