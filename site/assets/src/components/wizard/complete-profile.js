import { LitElement, html } from "lit"
import { live } from 'lit/directives/live.js';
import { Steps } from "./wizard-constants";

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
            isInfoOpen: { type: Boolean, attribute: false },
            infoText: { type: String, attribute: false },
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
        this.isInfoOpen = false
        this.infoText = ''

        this._clearLocations = this._clearLocations.bind(this)
        this._handleSuggestions = this._handleSuggestions.bind(this)
        this._debounceCityChange = debounce(getAddressSuggestions(this._handleSuggestions, jsObject.map_key)).bind(this)
        this._handleCityInputChange = this._handleCityInputChange.bind(this)
    }

    updated(properties) {
        if (properties.has('variant')) {
            this.renderRoot.querySelector('.inputs input').focus()
            this.isInfoOpen = false
        }
    }

    willUpdate(properties) {
        if (properties.has('value') && this.value !== '') {
            this.localValue = JSON.parse(this.value)
        }
    }

    render() {
        return html`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${ this.variant === Steps.updateName ? html`
                <h2>${this.t.name_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="name" class="visually-hidden">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable} placeholder=${this.t.name}>
                    <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('name')}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                </div>
            ` : ''}

            ${ this.variant === Steps.updatePhone ? html`
                <h2>${this.t.phone_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="phone" class="visually-hidden">${this.t.phone}</label>
                    <input
                        class="input"
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="\\(?\\+?[\\(\\)\\-\\s0-9]*"
                        value=""
                        placeholder=${this.t.phone}
                        ?required=${!this.skippable}
                        @input=${this._handleInput}
                        @invalid=${this._handleInvalid}
                    >
                    <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('phone')}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                    <div class="input-error" data-state="${this.phoneError.length ? '' : 'empty'}" >${this.phoneError}</div>
                </div>
            ` : ''}

            ${ this.variant === Steps.updateLocation ? html`
                <h2>${this.t.location_question}</h2>
                <div class="form-group stack--4">
                    <div class="d-flex align-items-center">
                        <label class="input-label visually-hidden" for="city">${this.t.city}</label>
                        <input
                            class="input"
                            type="text"
                            id="city"
                            name="city"
                            placeholder=${this.t.city}
                            .value="${this.city ? live(this.city) : this.localValue?.label}"
                            @input=${this._handleCityChange}
                        >
                        <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('location')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
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
            <div class="info-area collapse" data-state=${this.isInfoOpen ? 'open' : 'closed'}>
                <div class="card mw-50ch mx-auto">
                    <p>${this.infoText}</p>
                    <a class="f--1 gray-500" href=${jsObject.privacy_url + '#personal-information'} target="_blank">${this.t.privacy_page}</a>
                </div>
            </div>
            <div class="cluster | mx-auto">
                <button type="submit" class="btn tight light" ?disabled=${this.loading}>
                    ${this.t.next}
                   ${ [ Steps.updatePhone, Steps.updateName ].includes(this.variant) ? html`
                        <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                    ` : '' }
                </button>
            </div>
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

    _handleSubmit(event) {
        event.preventDefault()

        const hasLocation = event.srcElement.querySelector('#city')

        if (hasLocation) {
            this._handleSubmitLocation()
        } else {
            this._handleDone(event)
        }
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
        this.dispatchEvent(new CustomEvent( 'done-step', { bubbles: true } ))
    }

    _sendProfileUpdateEvent() {
        this.dispatchEvent(new CustomEvent( 'profile:reload', { bubbles: true } ))
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

        const value = getLocationGridFromMapbox(event.target.id, jsObject.profile.location)

        this.localValue = value
        this._clearLocations()
    }

    _handleSubmitLocation() {
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
        .then((response) => response.json())
        .then((newProfile) => {
            jsObject.profile = newProfile

            this._sendProfileUpdateEvent()
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

    _toggleInfo(type) {
        if (!this.isInfoOpen) {
            this._openInfo(type)
        } else {
            this.isInfoOpen = false
        }
    }

    _openInfo(type) {
        this.isInfoOpen = true
        switch (type) {
            case 'name':
                this.infoText = this.t.user_name_disclaimer
                break;
            case 'phone':
                this.infoText = this.t.user_phone_disclaimer
                break;
            case 'location':
                this.infoText = this.t.user_city_disclaimer
                break;
            default:
                break;
        }
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'complete-profile', CompleteProfile )