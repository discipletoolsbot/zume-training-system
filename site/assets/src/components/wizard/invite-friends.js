import { LitElement, html } from "lit"

/**
 * Component for inviting friends to a plan
 *
 * TODO: this needs fleshing out to be given a training code and title for sharing
 */
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
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'invite-friends', InviteFriends )