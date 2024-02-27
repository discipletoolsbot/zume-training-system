import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class CongratulationsSlide extends CourseSlide {
    render() {
        return html`
            <div class="cover">
                <div class="center activity-card" data-large>
                    <p>${this.slide['center'][0]}</p>
                    <p>${this.slide['center'][1] ?? ''}</p>
                </div>
            </div>
        `;
    }
}
customElements.define('congratulations-slide', CongratulationsSlide);
