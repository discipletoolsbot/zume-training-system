import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class CheckinSlide extends CourseSlide {
    render() {
        return html`
            <div class="two-column left">
                <div>
                    <div class="title-area">
                        <div class="title-icon"><img src="https://placehold.co/60x60/png" /></div>
                        <h2 class="title">${this.slide['left'][0]}</h2>
                    </div>
                </div>
                <div class="content-area">
                    <div class="stack">
                        <p>${this.slide['right'][0]}</p>
                        <div class="qr-code"><img src="${this.slide['right'][1]}" /></div>
                        <p>${this.slide['right'][2]} <span style="font-weight:bold;">${this.slide['right'][3]}</span></p>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('checkin-slide', CheckinSlide);
