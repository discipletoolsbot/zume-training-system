import { LitElement, html } from 'lit';

export class SlideSwitcher extends LitElement {
    static get properties() {
        return {
            slide: { type: Object},
            showControls: { type: Boolean },
            inContainer: { type: Boolean },
        };
    }

    render() {

        if ( !this.slide ) {
            return
        }

        switch (this.slide.type) {
            case 'title':
                return html`<title-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></title-slide>`
            case 'checkin':
                return html`<checkin-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></checkin-slide>`
            case 'pray':
                return html`<pray-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></pray-slide>`
            case 'review':
                return html`<review-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></review-slide>`
            case 'overview':
                return html`<overview-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></overview-slide>`
            case 'challenge':
            case 'center':
                return html`<center-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></center-slide>`
            case 'watch':
                return html`<watch-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></watch-slide>`
            case 'video':
                return html`<video-slide .slide=${this.slide} id=${this.slide.key} ?showButtons=${this.showControls} ?inContainer=${this.inContainer}></video-slide>`
            case 'look_back':
              return html`<look-back-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></look-back-slide>`
            case 'discuss':
                return html`<discuss-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></discuss-slide>`
            case 'left_content':
            case 'activity':
                return html`<activity-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></activity-slide>`
            case 'obey':
                return html`<obey-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></obey-slide>`
            case 'left_image':
                return html`<left-image-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></left-image-slide>`
            case 'next_steps':
                return html`<next-steps-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></next-steps-slide>`
            case 'break':
                return html`<break-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></break-slide>`
            case 'congratulations':
                return html`<congratulations-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></congratulations-slide>`
            case 'final':
                return html`<final-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></final-slide>`
            default:
                return html`<course-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></course-slide>`
        }
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('slide-switcher', SlideSwitcher);

