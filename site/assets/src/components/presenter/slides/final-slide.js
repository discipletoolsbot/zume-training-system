import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class FinalSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                <div class="cover">
                    <div class="center stack | text-center w-50">
                        <div class="w-30"><img src="${this.slide['center'][0]}" /></div>
                        <p>${this.slide['center'][1]}</p>
                        <div class="w-30"><img src="${this.slide['center'][2]}" /></div>
                        <p>${this.slide['center'][3]}</p>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('final-slide', FinalSlide);
