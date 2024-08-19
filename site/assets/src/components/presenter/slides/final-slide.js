import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class FinalSlide extends CourseSlide {

    dispatchOpenMenu() {
        this.dispatchEvent(new CustomEvent( 'presenter:open-menu', { bubbles: true } ))
    }

    render() {
        return html`
            <div class="slides-card">
                <div class="cover-page">
                    <div class="center stack | text-center w-50">
                        <div class="w-30"><img src="${this.slide['center'][0]}" /></div>
                        <p>${this.slide['center'][1]}</p>
                        <div class="w-30"><img src="${this.slide['center'][2]}" /></div>
                        <p>${this.slide['center'][3]}</p>
                        <a class="btn tight" href="${jsObject.home_url}">${jsObject.translations.home}</a>
                        <button class="btn tight" @click=${this.dispatchOpenMenu}>${jsObject.translations.menu}</button>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('final-slide', FinalSlide);
