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
                return html`<title-slide .slide=${this.slide}></title-slide>`
            case 'checkin':
                return html`<checkin-slide .slide=${this.slide}></checkin-slide>`
            case 'pray':
                return html`<pray-slide .slide=${this.slide}></pray-slide>`
            case 'review':
            case 'overview':
                return html`<overview-slide .slide=${this.slide}></overview-slide>`
            case 'challenge':
            case 'center':
                return html`<center-slide .slide=${this.slide}></center-slide>`
            case 'watch':
                return html`<watch-slide .slide=${this.slide}></watch-slide>`
            case 'video':
                return html`<video-slide .slide=${this.slide} ?showButtons=${this.showControls}></video-slide>`
            case 'look_back':
              return html`<look-back-slide .slide=${this.slide}></look-back-slide>`
            case 'discuss':
                return html`<discuss-slide .slide=${this.slide}></discuss-slide>`
            case 'left_content':
            case 'activity':
                return html`<activity-slide .slide=${this.slide}></activity-slide>`
            case 'obey':
                return html`<obey-slide .slide=${this.slide}></obey-slide>`
            case 'left_image':
                return html`<left-image-slide .slide=${this.slide}></left-image-slide>`
            case 'next_steps':
                return html`<next-steps-slide .slide=${this.slide}></next-steps-slide>`
            case 'break':
                return html`<break-slide .slide=${this.slide}></break-slide>`
            case 'congratulations':
                return html`<congratulations-slide .slide=${this.slide}></congratulations-slide>`
            case 'final':
                return html`<final-slide .slide=${this.slide}></final-slide>`
            default:
                return html`<course-slide .slide=${this.slide}></course-slide>`
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

