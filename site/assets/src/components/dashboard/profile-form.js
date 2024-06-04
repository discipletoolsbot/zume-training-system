import { LitElement, html } from 'lit';

export class ProfileForm extends LitElement {
    static get properties() {
        return {
            userProfile: { type: Object },
            loading: { type: Boolean, attribute: false },
            locations: { type: Array, attribute: false },
            infosOpen: { type: Array, attribute: false }
        };
    }
    constructor() {
        super()
        this.userProfile = {}
        this.locations = []
        this.infosOpen = []
    }

    firstUpdated() {
        this.nameInput = this.renderRoot.querySelector('#full_name')
        this.phoneInput = this.renderRoot.querySelector('#phone')
        this.emailInput = this.renderRoot.querySelector('#email')
        this.preferredEmailInput = this.renderRoot.querySelector('#communications_email')
        this.cityInput = this.renderRoot.querySelector('#city')
        this.prefferedLanguageInput = this.renderRoot.querySelector('#preferred_language')
        this.addressResultsContainer = this.renderRoot.querySelector('#address_results')
    }

    submitProfileForm(e) {
        e.preventDefault()

        const name = this.nameInput.value
        const email = this.emailInput.value
        const communications_email = this.preferredEmailInput.value
        const phone = this.phoneInput.value
        const preferred_language = this.prefferedLanguageInput.value

        const data = {
          name,
          phone,
          email,
          communications_email,
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

    _toggleInfo(type) {
        if (this.infosOpen.includes(type)) {
            const newInfosOpen = [...this.infosOpen]
            newInfosOpen.splice(newInfosOpen.indexOf(type), 1)
            this.infosOpen = newInfosOpen
        } else {
            this.infosOpen = [...this.infosOpen, type]
        }
    }

    render() {
        return html`
            <form action="" class="stack--2" id="profile-form" @submit=${this.submitProfileForm}>

                <div class="">
                    <label for="full_name">${jsObject.translations.name}</label>
                    <div class="d-flex align-items-center">
                        <input class="input" required type="text" id="full_name" name="full_name" value=${this.userProfile.name}>
                        <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('name')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div class="info-area collapse ${this.infosOpen.includes('name') ? 'mt-0' : ''}" data-state=${this.infosOpen.includes('name') ? 'open' : 'closed'}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_name_disclaimer}</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="phone">${jsObject.translations.phone}</label>
                    <div class="d-flex align-items-center">
                        <input class="input" type="tel" id="phone" name="phone" value=${this.userProfile.phone}>
                        <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('phone')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div class="info-area collapse ${this.infosOpen.includes('phone') ? 'mt-0' : ''}" data-state=${this.infosOpen.includes('phone') ? 'open' : 'closed'}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_phone_disclaimer}</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="email">${jsObject.translations.email}</label>
                    <div class="d-flex align-items-center">
                        <input class="input" type="email" id="email" name="email" value=${this.userProfile.email}>
                        <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('email')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div class="info-area collapse ${this.infosOpen.includes('email') ? 'mt-0' : ''}" data-state=${this.infosOpen.includes('email') ? 'open' : 'closed'}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_email_disclaimer}</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="communications_email">${jsObject.translations.communications_email}</label>
                    <div class="d-flex align-items-center">
                        <input class="input" type="email" id="communications_email" name="communications_email" value=${this.userProfile.communications_email}>
                        <button type="button" class="icon-btn f-1 invisible" @click=${() => this._toggleInfo('communications_email')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div class="info-area collapse ${this.infosOpen.includes('communications_email') ? 'mt-0' : ''}" data-state=${this.infosOpen.includes('communications_email') ? 'open' : 'closed'}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_communications_email_disclaimer}</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="city">${jsObject.translations.city}</label>
                    <div class="d-flex align-items-center">
                        <input class="input" type="text" id="city" name="city" value=${this.userProfile.location?.label ?? ''} @input=${this.processLocation}>
                        <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('city')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div class="info-area collapse ${this.infosOpen.includes('city') ? 'mt-0' : ''}" data-state=${this.infosOpen.includes('city') ? 'open' : 'closed'}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_city_disclaimer}</p>
                        </div>
                    </div>
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
                    <label for="preferred_language">${jsObject.translations.language}</label>
                    <div class="d-flex align-items-center">
                        <select class="input" name="preferred_language" id="preferred_language">

                        ${
                            Object.values(jsObject.languages).map((item) => html`
                                <option value=${item.code} ?selected=${this.userProfile.preferred_language === item.code}>
                                    ${item.nativeName} - ${item.enDisplayName}
                                </option>
                            `)
                        }

                        </select>
                        <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('preferred_language')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div class="info-area collapse ${this.infosOpen.includes('preferred_language') ? 'mt-0' : ''}" data-state=${this.infosOpen.includes('preferred_language') ? 'open' : 'closed'}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_preferred_language_disclaimer}</p>
                        </div>
                    </div>

                </div>

                <button class="btn my-0 fit-content" id="submit-profile" ?disabled=${this.loading}>${jsObject.translations.save}</button>
                <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>

            </form>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('profile-form', ProfileForm);
