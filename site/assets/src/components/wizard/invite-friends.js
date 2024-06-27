import { LitElement, html } from "lit"
import { DateTime } from "luxon"

/**
 * Component for inviting friends to a plan
 */
export class InviteFriends extends LitElement {
    static get properties() {
        return {
            name: { type: String },
            module: { type: String },
            skippable: { type: Boolean },
            t: { type: Object },
            invitecode: { type: String },
            loading: { type: Boolean, attribute: false },
            errorMessage: { type: String, attribute: false },
            copyFeedback: { type: String, attribute: false },
            training: { type: Object, attribute: false },
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.skippable = false
        this.t = {}

        this.training = {}
        this.loading = false
        this.errorMessage = ''
        this.copyFeedback = ''
        this.url = ''
    }

    connectedCallback() {
        super.connectedCallback();

        const url = new URL(location.href)

        if (!this.invitecode) {
            const joinKey = url.searchParams.get('joinKey')
            this.invitecode = joinKey
        }

        this.url = jsObject.site_url + `/app/plan-invite${this.invitecode !== '' ? '?code=' + this.invitecode : ''}`
        this.loading = true

        makeRequest( 'GET', `plan/${this.invitecode}`, {}, 'zume_system/v1' )
            .then((data) => {
                if (data.error_code) {
                    this.errorMessage = this.t.broken_link
                    return
                }
                this.training = data
                this.errorMessage = ''
            })
            .fail((error) => {
                console.error(error)
                this.errorMessage = this.t.broken_link
            })
            .always(() => {
                this.loading = false
            })

        this.dispatchEvent(new CustomEvent('wizard:finish', { bubbles: true }))
    }

    getNextSession() {
        if (Object.keys(this.training).length === 0) {
            return
        }

        const { set_type } = this.training

        const numberOfSessions = this.numberOfSessions(set_type.key)

        const now = DateTime.now()
        for (let i = 1; i < numberOfSessions + 1; i++) {
            const digit = i < 10 ? `0${i}` : `${i}`
            const date = this.training[set_type.key + '_' + digit]

            if (!date) {
                continue
            }

            if (DateTime.fromSeconds(date.timestamp).endOf('day') > now.startOf('day')) {
                return DateTime.fromSeconds(date.timestamp).toISODate()
            }
        }
        return ''
    }

    numberOfSessions(setType) {
        switch (setType) {
            case 'set_a':
                return 10
            case 'set_b':
                return 20
            case 'set_c':
                return 5
            default:
                break;
        }
    }

    getInviteText() {
        const nextSession = this.getNextSession()
        const note = this.t.note.replace('%s', this.training.post_author_display_name)
        const location = this.training.location_note
        const timeOfDayNote = this.training.time_of_day_note ? `, ${this.training.time_of_day_note}` : ''
        const timezoneNote = this.training.timezone_note ? `, ${this.training.timezone_note}` : ''

        const inviteText = `${note}

${this.t.location}: ${location}
${this.t.time}: ${nextSession !== '' ? DateTime.fromISO(nextSession).toFormat('DDDD') + timeOfDayNote + timezoneNote : ''}

${this.t.join_url}
${this.url}

${this.t.join_key}: ${this.training.join_key}
${
    this.training.zoom_link_note ? `\n${this.training.zoom_link_note}\n` : ''
}`

        return inviteText
    }

    copyInvite() {
        const inviteText = this.getInviteText()

        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(inviteText)
                .then(() => {
                    this.copyFeedback = this.t.copy_feedback

                    setTimeout(() => {
                        this.copyFeedback = ''
                    }, 3000)
                })
        }
    }

    render() {
        const inviteText = this.getInviteText()

        return html`
            <div class="center stack">
                <span class="z-icon-share brand-light f-7"></span>
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>

                ${
                    this.loading ? html`<span class="loading-spinner active"></span>` : ''
                }
                ${
                    !this.loading && this.errorMessage !== '' ? html`<span class="banner warning">${this.errorMessage}</span>` : ''
                }
                ${
                    !this.loading && this.errorMessage === '' ? html`
                        <textarea class="input" rows="9">${inviteText}</textarea>
                        ${
                            navigator.clipboard ? html`
                                <div class="position-relative">
                                    <button class="btn mx-auto fit-content" @click=${this.copyInvite}>${this.t.copy_invite}</button>
                                    <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length ? '' : 'empty'}>${this.copyFeedback}</p>
                                </div>
                            ` : ''
                        }

                        <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t} alwaysShow ></share-links>
                    ` : ''
                }
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'invite-friends', InviteFriends )
