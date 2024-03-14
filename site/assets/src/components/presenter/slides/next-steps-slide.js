import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class NextStepsSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover">
                    <h2 class="title text-center" data-small>${this.slide['center'][0]}</h2>
                    <div class="two-column middle" data-align-start>
                        <div>
                            <div class="stack align-items-center">
                                <p><strong>${this.slide['left'][0]}</strong></p>
                                <div class="qr-code"><img src="${this.slide['left'][2]}" /></div>
                                <p>${this.slide['left'][1]}</p>
                            </div>
                        </div>
                        <div>
                            <div class="stack align-items-center">
                                <p><strong>${this.slide['right'][0]}</strong></p>
                                <div class="qr-code"><img src="${this.slide['right'][2]}" /></div>
                                <p>${this.slide['right'][1]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('next-steps-slide', NextStepsSlide);
