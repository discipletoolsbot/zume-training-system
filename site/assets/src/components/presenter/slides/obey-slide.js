import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class ObeySlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="obey-slide">
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
                            <p>${this.slide['right'][0]}</p>
                        </div>
                    </div>
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <img src="https://placehold.co/60x60/png" />
                                </div>
                                <h2 class="title">${this.slide['left'][1]}</h2>
                            </div>
                        </div>
                        <div class="content-area">
                            <p>${this.slide['right'][1]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('obey-slide', ObeySlide);
