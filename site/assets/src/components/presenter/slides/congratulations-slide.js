import { html } from 'lit'
import { CourseSlide } from './course-slide'

export class CongratulationsSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                <div class="cover-page container">
                    <div>
                        <div class="center activity-card" data-large>
                            <p>${this.slide['center'][0]}</p>
                        </div>
                        <div class="center">
                            <p>
                                <img src="${this.slide['center'][1] ?? ''}" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
customElements.define('congratulations-slide', CongratulationsSlide)
