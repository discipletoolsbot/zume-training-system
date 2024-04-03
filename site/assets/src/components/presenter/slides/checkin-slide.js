import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class CheckinSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><span class="icon zume-phone"></span></div>
                            <h2 class="title">${this.slide['left'][0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            <p>${this.slide['right'][0]}</p>
                            <div class="qr-code"><a href="${this.slide['right'][1]}" target="_blank"><img src="${this.slide['right'][2]}" /></a></div>
                            <p>${this.slide['right'][3]} <span style="font-weight:bold;">${this.slide['right'][4]}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('checkin-slide', CheckinSlide);
