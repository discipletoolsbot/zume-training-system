import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class WatchSlide extends CourseSlide {

    nextSlide() {
        this.dispatchEvent(new CustomEvent('next-slide', { bubbles: true }))
    }

    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide['left'][0]}</h2>
                                <span class="subtitle">${this.slide['length'] ?? ''}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide['right'], true)}
                            <div>
                                <button
                                    class="watch-btn | btn tight d-flex align-items-center gap--1"
                                    type="button"
                                    @click=${this.nextSlide}
                                >
                                    <span>${this.slide['left'][0]}</span>
                                    <span class="icon z-icon-watch f-3"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('watch-slide', WatchSlide);
