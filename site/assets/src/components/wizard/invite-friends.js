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
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.skippable = false
        this.variant = ''
        this.t = {}
        this.locations = []
        this.locationError = ''
        this.city = ''
        this.loading = false

        this._clearLocations = this._clearLocations.bind(this)
        this._handleSuggestions = this._handleSuggestions.bind(this)
        this._debounceCityChange = debounce(getAddressSuggestions(this._handleSuggestions, zumeProfile.map_key)).bind(this)
        this._handleCityInputChange = this._handleCityInputChange.bind(this)
    }

    render() {
        return html`
            <div class="center">
                <h1>Invite your friends to join your training</h1>
                <p>Share the link below with your friends so that they can join your training.</p>
                <code>https://zume5.test/zume_app/friend_invite?code=123456</code>
                <p>Alternatively your friends can scan this QR code in order to join.</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zume5.test/zume_app/friend_invite?code=123456" alt="" />
            </div>
        `
    }

    _handleDone(event) {
        if (event) {
            event.preventDefault()
        }

        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
    }

    _handleNameChange(event) {
        event.stopPropagation()

        const updates = {
            [event.target.name]: event.target.value,
        }

        this._updateProfile(updates)
    }

    _handlePhoneChange(event) {
        event.stopPropagation()

        const updates = {
            [event.target.name]: event.target.value,
        }

        this._updateProfile(updates)
    }

    _handleCityChange(event) {
        this._handleCityInputChange(event)
        this._debounceCityChange(event)
    }

    _handleCityInputChange(event) {
        this.city = event.target.value
    }

    _handleSuggestions(data) {
        if (data.features.length < 1) {
            this.locationError = this.t.no_locations_found
        }

        this.locations = data.features
    }

    _handleLocationSelection(event) {
        this.city = event.target.dataset.placeName

        const updates = {
            location_grid_meta: getLocationGridFromMapbox(event.target.id, zumeProfile.profile.location),
        }

        this._updateProfile(updates, () => {
            this._clearLocations()
            this._handleDone()
        })


    }

    _updateProfile(updates, successCallback) {
        /* Update the profile using the api */
        this.loading = true

        fetch( jsObject.rest_endpoint + '/profile', {
            method: 'POST',
            body: JSON.stringify(updates),
            headers: {
                'X-WP-Nonce': jsObject.nonce
            }
        } )
        .then(() => {
            console.log('success')
            successCallback()
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            this.loading = false
        })
    }

    _clearLocations() {
        this.locations = []
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'invite-friends', InviteFriends )