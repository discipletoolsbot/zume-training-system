import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class BreakSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <div class="grow-1 d-flex align-items-center">
                        <div class="center activity-card stack--2" data-large>
                            <span>${this.slide['center'][0]}</span>
                            ${
                                this.slide['center'][1]
                                    ? html`<span>${this.slide['center'][1]}</span>`
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('break-slide', BreakSlide);
