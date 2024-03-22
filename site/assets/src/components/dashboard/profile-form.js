import { LitElement, html } from 'lit';

export class ProfileForm extends LitElement {
    static get properties() {
        return {
            userProfile: { type: Object },
            loading: { type: Boolean, attribute: false },
            locations: { type: Array, attribute: false },
        };
    }
    constructor() {
        super()
        this.userProfile = {}
        this.locations = []
    }

    firstUpdated() {
        this.nameInput = this.renderRoot.querySelector('#full_name')
        this.phoneInput = this.renderRoot.querySelector('#phone')
        this.emailInput = this.renderRoot.querySelector('#email')
        this.cityInput = this.renderRoot.querySelector('#city')
        this.prefferedLanguageInput = this.renderRoot.querySelector('#preferred-language')
        this.addressResultsContainer = this.renderRoot.querySelector('#address_results')
    }

    submitProfileForm(e) {
        e.preventDefault()

        const name = this.nameInput.value
        const email = this.emailInput.value
        const phone = this.phoneInput.value
        const preferred_language = this.prefferedLanguageInput.value

        const data = {
          name,
          phone,
          email,
          preferred_language,
        }

        data.location_grid_meta = getLocationGridFromMapbox(this.mapboxSelectedId, this.userProfile.location)

        this.loading = true

        /* submit data to profile API endpoint */
        fetch( jsObject.rest_endpoint + '/profile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'X-WP-Nonce': jsObject.nonce
            }
        } )
        .then((response) => response.json())
        .then((profile) => {
            const event = new CustomEvent( 'user-profile:change', { bubbles: true, detail: profile} )
            this.dispatchEvent(event)
            const stateChangeEvent = new CustomEvent( 'user-state:change', { bubbles: true } )
            this.dispatchEvent(stateChangeEvent)
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            this.loading = false
        })
    }

    /* I couldn't get this to bind correctly, so have made an arrow function to implicitly gain access to 'this' of the class */
    addressCallback = (data) => {
        if ( data.features.length < 1 ) {
            this.locations = -1
        } else {
            this.locations = data.features
        }
    }

    processLocation = debounce(getAddressSuggestions(this.addressCallback, jsObject.map_key))

    selectAddress(e) {
        /* Escape placeName */
        const id = e.target.id
        const placeName = e.target.dataset.placeName

        this.cityInput.value = placeName

        this.mapboxSelectedId = id

        this.locations = []
    }

    render() {
        return html`
            <form action="" id="profile-form" @submit=${this.submitProfileForm}>

                <div class="">
                    <label for="full_name">${jsObject.translations.name}</label>
                    <input class="input" required type="text" id="full_name" name="full_name" value=${this.userProfile.name}>
                </div>
                <div class="">
                    <label for="phone">${jsObject.translations.phone}</label>
                    <input class="input" type="tel" id="phone" name="phone" value=${this.userProfile.phone}>
                </div>
                <div class="">
                    <label for="email">${jsObject.translations.email}</label>
                    <input class="input" type="email" id="email" name="email" value=${this.userProfile.email}>
                </div>
                <div class="">
                    <label for="city">${jsObject.translations.city}</label>
                    <input class="input" type="text" id="city" name="city" value=${this.userProfile.location?.label ?? ''} @input=${this.processLocation}>
                </div>
                    ${
                        !Array.isArray(this.locations)
                        ? html`
                            ${jsObject.translations.no_locations}
                        `
                        : ''
                    }
                    ${
                        Array.isArray(this.locations) && this.locations.length > 0
                        ? html`
                            <div id="address_results" class="stack my-0">
                                ${ this.locations.map((feature) => html`
                                    <div
                                        class="card-btn | text-center"
                                        role="button"
                                        id="${feature.id}"
                                        data-place-name="${feature.place_name}"
                                        @click=${this.selectAddress}
                                    >
                                        ${feature.place_name}
                                    </div>
                                `)}
                            </div>
                        ` : ''
                    }
                </div>

                <div>
                    <label for="preferred-language">${jsObject.translations.language}</label>
                    <select class="input" name="preferred-language" id="preferred-language">

                    ${
                        Object.values(jsObject.languages).map((item) => html`
                            <option value=${item.code} ?selected=${this.userProfile.preferred_language === item.code}>
                                ${item.nativeName} - ${item.enDisplayName}
                            </option>
                        `)
                    }

                    </select>
                </div>

                <button class="btn my-0" id="submit-profile" ?disabled=${this.loading}>${jsObject.translations.save}</button>
                <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>

            </form>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('profile-form', ProfileForm);
