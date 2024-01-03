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
            /**
             * The value of the variant's field if it exists
             */
            value: { type: String },

            locations: { attribute: false },
            locationError: { attribute: false },
            phoneError: { attribute: false },
            city: { attribute: false },
            loading: { attribute: false },
            state: { attribute: false },
            localValue: { attribute: false },
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
        this.localValue = ''
        this.phoneError = ''

        this._clearLocations = this._clearLocations.bind(this)
        this._handleSuggestions = this._handleSuggestions.bind(this)
        this._debounceCityChange = debounce(getAddressSuggestions(this._handleSuggestions, zumeProfile.map_key)).bind(this)
        this._handleCityInputChange = this._handleCityInputChange.bind(this)
    }

    firstUpdated() {
        this.renderRoot.querySelector('.inputs input').focus()
        if ( this.value !== '' ) {
            this.localValue = JSON.parse(this.value)
        }
    }

    render() {
        return html`
        <form class="inputs stack" @submit=${this._handleDone}>
            ${ this.variant === ZumeWizardSteps.updateName ? html`
                <h2>${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.updatePhone ? html`
                <h2>${this.t.phone_question}</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input
                        class="input"
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="\\(?\\+?[\\(\\)\\-\\s0-9]*"
                        value=""
                        ?required=${!this.skippable}
                        @input=${this._handleInput}
                        @invalid=${this._handleInvalid}
                    >
                    <div class="input-error" data-state="${this.phoneError.length ? '' : 'empty'}" >${this.phoneError}</div>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.updateLocation ? html`
                <h2>${this.t.location_question}</h2>
                <div class="form-group">
                    <label class="input-label" for="city">${this.t.city}</label>
                    <input
                        class="input"
                        type="text"
                        id="city"
                        name="city"
                        .value="${this.city ? live(this.city) : this.localValue?.label}"
                        @input=${this._handleCityChange}
                    >
                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <button>${this.t.accept}</button>
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
                <div class="cluster | mx-auto">
                    <button type="button" class="btn" ?disabled=${this.loading} @click=${this.handleSubmitLocation}>${this.t.done}</button>
                </div>
            ` : '' }
            ${ [ ZumeWizardSteps.updatePhone, ZumeWizardSteps.updateName ].includes(this.variant) ? html`
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                </div>
            ` : '' }
        </form>
        `
    }

    _handleInput(event) {
        this.phoneError = ''
    }

    _handleInvalid(event) {
        event.preventDefault()

        this.phoneError = this.t.phone_error
    }

    _handleDone(event) {
        if (event) {
            event.preventDefault()
        }

        const targetInput = event.target[0]

        if (targetInput.type === 'submit') {
            return
        }

        let { name, value } = targetInput

        if (targetInput.type === 'tel') {
            value = targetInput.value.replace(/[\(\)\-\s]/g, '')
        }

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

        this.localValue = value
        this._clearLocations()
    }

    handleSubmitLocation() {
        if (this.localValue.source === 'ip') {
            const { label, level, lat, lng } = this.localValue
            this.localValue = {
                source: 'user',
                grid_id: false,
                label,
                level,
                lat: Number(lat),
                lng: Number(lng),
            }
        }

        this._updateProfile('location_grid_meta', this.localValue, () => {
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