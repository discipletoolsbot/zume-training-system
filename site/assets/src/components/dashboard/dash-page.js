import { LitElement } from 'lit';

export class DashPage extends LitElement {

    constructor() {
        super()

        const html = document.querySelector('html')
        const dir = html.dataset.dir

        this.isRtl = dir === 'rtl'
    }

    firstUpdated() {
        this.attachResizeObeserver()
        this.updateHeaderStyle()
    }

    attachResizeObeserver() {

        /* attach resizeObserver to dash-header-right */
        /* fire updateHeaderStyle when the observer is triggered */

        const headerRight = document.querySelector('dash-header-right')

        const resizeObeserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if ( !entry.contentRect ) {
                    return
                }
                const height = Math.round(entry.contentRect.height)
                const width = Math.round(entry.contentRect.width)
                this.updateHeaderStyle(false, height, width)
            }
        })

        this.resizeObserver = resizeObeserver

        resizeObeserver.observe(headerRight)
    }

    updateHeaderStyle(initial = true, height = 0, width = window.innerWidth) {
        const headerLeft = document.querySelector('.dashboard__header.left')
        if (initial) {
            this.initialOffset = headerLeft.offsetTop
        }

        /* If the headerRight is now a lot less than screenwidth, we need to put the headerLeft back to initial */
        let offset
        if ( width < window.innerWidth / 2 ) {
            offset = this.initialOffset
        } else {
            offset = this.initialOffset + height
        }
        headerLeft.style.top = offset + 'px'
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        if (this.resizeObserver) {
            this.resizeObserver.disconnect()
        }
    }
}
