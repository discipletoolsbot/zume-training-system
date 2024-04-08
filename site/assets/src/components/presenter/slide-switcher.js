import { LitElement, html } from 'lit';

export class SlideSwitcher extends LitElement {
    static get properties() {
        return {
            slide: { type: Object},
            showControls: { type: Boolean },
        };
    }

    render() {

        if ( !this.slide ) {
            return
        }

        switch (this.slide.type) {
            case 'title':
                return html`<title-slide .slide=${this.slide} id=${this.slide.key}></title-slide>`
            case 'checkin':
                return html`<checkin-slide .slide=${this.slide} id=${this.slide.key}></checkin-slide>`
            case 'pray':
                return html`<pray-slide .slide=${this.slide} id=${this.slide.key}></pray-slide>`
            case 'review':
                return html`<review-slide .slide=${this.slide} id=${this.slide.key}></review-slide>`
            case 'overview':
                return html`<overview-slide .slide=${this.slide} id=${this.slide.key}></overview-slide>`
            case 'challenge':
            case 'center':
                return html`<center-slide .slide=${this.slide} id=${this.slide.key}></center-slide>`
            case 'watch':
                return html`<watch-slide .slide=${this.slide} id=${this.slide.key}></watch-slide>`
            case 'video':
                return html`<video-slide .slide=${this.slide} id=${this.slide.key} ?showButtons=${this.showControls}></video-slide>`
            case 'look_back':
              return html`<look-back-slide .slide=${this.slide} id=${this.slide.key}></look-back-slide>`
            case 'discuss':
                return html`<discuss-slide .slide=${this.slide} id=${this.slide.key}></discuss-slide>`
            case 'left_content':
            case 'activity':
                return html`<activity-slide .slide=${this.slide} id=${this.slide.key}></activity-slide>`
            case 'obey':
                return html`<obey-slide .slide=${this.slide} id=${this.slide.key}></obey-slide>`
            case 'left_image':
                return html`<left-image-slide .slide=${this.slide} id=${this.slide.key}></left-image-slide>`
            case 'next_steps':
                return html`<next-steps-slide .slide=${this.slide} id=${this.slide.key}></next-steps-slide>`
            case 'break':
                return html`<break-slide .slide=${this.slide} id=${this.slide.key}></break-slide>`
            case 'congratulations':
                return html`<congratulations-slide .slide=${this.slide} id=${this.slide.key}></congratulations-slide>`
            case 'final':
                return html`<final-slide .slide=${this.slide} id=${this.slide.key}></final-slide>`
            default:
                return html`<course-slide .slide=${this.slide} id=${this.slide.key}></course-slide>`
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

