import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class WatchSlide extends CourseSlide {
    render() {
        return html`
            <div class="two-column left">
                <div>
                    <div class="title-area">
                        <div class="title-icon">
                            <img src="https://placehold.co/60x60/png" />
                        </div>
                        <div class="stack">
                            <h2 class="title">${this.slide['left'][0]}</h2>
                            <span class="subtitle">${this.slide['left'][1] ?? ''}</span>
                        </div>
                    </div>
                </div>
                <div class="content-area">
                    <div class="stack">
                        ${this.renderContent(this.slide['right'], true)}
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('watch-slide', WatchSlide);
