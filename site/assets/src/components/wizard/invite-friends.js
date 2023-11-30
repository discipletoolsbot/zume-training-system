import { LitElement, html } from "lit"
import { live } from 'lit/directives/live.js';

export class InviteFriends extends LitElement {
    static get properties() {
        return {
            /**
             * The step name
             */
            name: { type: String },
            /**
             * The module name that this step is part of
             */
            module: { type: String },
            /**
             * Is this step skippable
             */
            skippable: { type: Boolean },
            /**
             * Translation strings
             */
            t: { type: Object },
            /**
             * The url to share
             */
            inviteCode: { type: String },
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.skippable = false
        this.t = {}
        this.inviteCode = '123456'
        this.url = `https://zume5.test/zume_app/plan_invite${this.inviteCode !== '' ? '?code=' + this.inviteCode : ''}`
    }

    render() {
        return html`
            <div class="center stack">
                <h1>Invite your friends to join your training</h1>
                <p>Share the link below with your friends so that they can join your training.</p>
                <share-links url=${this.url} title="Join my zume plan" .t=${this.t}></share-links>
                <p>Alternatively your friends can scan this QR code in order to join.</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}" alt="" />
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'invite-friends', InviteFriends )