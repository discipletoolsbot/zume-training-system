import { LitElement, html } from "lit"
import { live } from 'lit/directives/live.js';
import { ZumeWizardSteps } from "./wizard-constants";

export class CompleteProfile extends LitElement {
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
             * What inputs to display
             */
            variant: { type: String },
            locations: { attribute: false },
            locationError: { attribute: false },
            city: { attribute: false },
            loading: { attribute: false },
            state: { attribute: false },
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

    firstUpdated() {
        this.renderRoot.querySelector('.inputs input').focus()
    }

    render() {
        return html`
        <form class="inputs" @submit=${this._handleDone}>
            ${ this.variant === ZumeWizardSteps.updateName ? html`
                <h2 class="f-1">${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input type="text" id="name" name="name" value="" ?required=${!this.skippable}>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.updatePhone ? html`
                <h2 class="f-1">${this.t.phone_question}</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input type="tel" id="phone" name="phone" value="" ?required=${!this.skippable}>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.updateLocation ? html`
                <h2 class="f-1">${this.t.location_question}</h2>
                <div class="">
                    <label for="city">${this.t.city}</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        .value="${live(this.city)}"
                        @input=${this._handleCityChange}
                    >
                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                </div>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map((location) => {
                        return html`
                            <div
                                class="address-result"
                                id="${location.id}"
                                data-place-name=${location.place_name}
                                @click=${this._handleLocationSelection}
                            >
                                ${location.place_name}
                            </div>
                        `
                    })}
                </div>
            ` : '' }
            ${ [ ZumeWizardSteps.updatePhone, ZumeWizardSteps.updateName ].includes(this.variant) ? html`
                <div class="cluster">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                </div>
            ` : '' }
        </form>
        `
    }

    _handleDone(event) {
        if (event) {
            event.preventDefault()
        }

        const targetInput = event.target[0]

        if (targetInput.type === 'submit') {
            return
        }

        const { name, value } = targetInput

        this._updateProfile(name, value, () => {
            this._sendDoneStepEvent()
        })
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
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

        const value = getLocationGridFromMapbox(event.target.id, zumeProfile.profile.location)

        this._updateProfile('location_grid_meta', value, () => {
            this._clearLocations()
            this._sendDoneStepEvent()
        })


    }

    _updateProfile(key, value, successCallback = () => {}) {
        /* Update the profile using the api */
        this.loading = true

        const updates = {
            [key]: value
        }

        fetch( jsObject.rest_endpoint + '/profile', {
            method: 'POST',
            body: JSON.stringify(updates),
            headers: {
                'X-WP-Nonce': jsObject.nonce
            }
        } )
        .then(() => {
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

window.customElements.define( 'complete-profile', CompleteProfile )