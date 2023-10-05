import { LitElement, html } from "lit"
import { live } from 'lit/directives/live.js';

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
             * Translation strings
             */
            t: { type: Object },
            /**
             * The locations from mapbox
             */
            locations: { attribute: false },
            locationError: { attribute: false },
            city: { attribute: false },
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.t = {}
        this.locations = []
        this.locationError = ''
        this.city = ''

        this._handleLocationsChange = this._handleLocationsChange.bind(this)
        this._clearLocations = this._clearLocations.bind(this)
        this._handleSuggestions = this._handleSuggestions.bind(this)
        this._debounceCityChange = debounce(getAddressSuggestions(this._handleSuggestions, zumeProfile.map_key)).bind(this)
        this._handleCityInputChange = this._handleCityInputChange.bind(this)
    }

    firstUpdated() {
        this.renderRoot.querySelector('#phone').focus()
    }

    render() {
        return html`
        <h1 class="text-center">${this.t.title}</h1>
        <div>
            <div class="">
                <label for="phone">${this.t.phone}</label>
                <input type="tel" id="phone" name="phone" value="" @change=${this._handlePhoneChange}>
            </div>
            <div class="">
                <label for="city">${this.t.city}</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    .value="${live(this.city)}"
                    @input=${this._handleCityChange}
                >
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
        </div>
        `
    }

    _handlePhoneChange(event) {
        event.stopPropagation()

        const newEvent = new CustomEvent( 'profile-change', {
            detail: {
                id: event.target.name,
                value: event.target.value
            }
        } )

        this.dispatchEvent(newEvent)
    }

    _handleCityChange(event) {
        this._handleCityInputChange(event)
        this._debounceCityChange(event)
    }

    _handleCityInputChange(event) {
        //this.city = event.target.value
    }

    _handleSuggestions(data) {
        if (data.features.length < 1) {
            this.locationError = this.t.no_locations_found
        }

        this.locations = data.features
    }

    _handleLocationsChange(locations) {
        this.locations = locations
    }

    _handleLocationSelection(event) {
        this.city = event.target.dataset.placeName

        const newEvent = new CustomEvent( 'profile-change', {
            detail: {
                id: 'location_grid_meta',
                value: getLocationGridFromMapbox(event.target.id, zumeProfile.profile.location)
            }
        } )

        this.dispatchEvent(newEvent)

        this._clearLocations()
    }

    _clearLocations() {
        this.locations = []
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'complete-profile', CompleteProfile )