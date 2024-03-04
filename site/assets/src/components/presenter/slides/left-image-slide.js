import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class LeftImageSlide extends CourseSlide {
    render() {
        return html`
            <div class="two-column right">
                <div>
                    <div class="cover center text-center">
                        <p><strong>${this.slide['left'][0]}</strong></p>
                        <div class="mw-60"><img src="${this.slide['left'][1]}" /></div>
                    </div>
                </div>
                <div class="content-area">
                    <div class="stack center | text-center">
                        <div class="qr-code"><img src="${this.slide['right'][0]}" /></div>
                        <p>${this.slide['right'][1]}</p>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('left-image-slide', LeftImageSlide);
