const profileForm = document.getElementById('profile-form')
const nameInput = document.getElementById('full_name')
const phoneInput = document.getElementById('phone')
const emailInput = document.getElementById('email')
const cityInput = document.getElementById('city')
const uiLanguageInput = document.getElementById('ui-language')
const addressResultsContainer = document.getElementById('address_results')

const old_ui_language = uiLanguageInput.value

profileForm.addEventListener( 'submit', submitProfileForm )
function submitProfileForm(e) {
    e.preventDefault()

    const name = nameInput.value
    const email = emailInput.value
    const phone = phoneInput.value
    const ui_language = uiLanguageInput.value

    const data = {
      name,
      phone,
      email,
      ui_language,
    }

    data.location_grid_meta = getLocationGridFromMapbox(zumeProfile.mapbox_selected_id, zumeProfile.profile.location)

    /* start loading spinner */
    const submitButton = document.querySelector('#submit-profile')
    const loadingSpinner = document.querySelector('.loading-spinner')

    submitButton.setAttribute('disabled', true)
    loadingSpinner.classList.add('active')

    /* submit data to profile API endpoint */
    fetch( zumeProfile.rest_endpoint + '/profile', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-WP-Nonce': zumeProfile.nonce
        }
    } )
    .then((response) => response.json())
    .catch((error) => {
        console.error(error)
    })
    .finally(() => {
        submitButton.removeAttribute('disabled')
        loadingSpinner.classList.remove('active')

        /* if the language was changed, trigger a refresh */
        if ( ui_language !== old_ui_language ) {
            window.SHAREDFUNCTIONS.setCookie( zumeProfile.language_cookie, ui_language, '/', 365 )
            window.location.reload()
        }
    })
}

const processLocation = debounce(getAddressSuggestions(addressCallback, zumeProfile.map_key))
cityInput.addEventListener( 'input', processLocation )

function addressCallback(data) {
    if (data.features.length < 1) {
        addressResultsContainer.innerHTML = `
            No Locations Found
        ` /* TODO: translate and escape me */
    }

    let locations = ''
    data.features.forEach((feature) => {
        locations += `
            <div class="address-result" id="${feature.id}" data-place-name="${feature.place_name}">
                ${feature.place_name}
            </div>
        ` /* TODO: escape place names */
    })

    addressResultsContainer.innerHTML = locations

    addressResults = document.querySelectorAll('.address-result')
    addressResults.forEach((result) => {
        result.addEventListener('click', function(e) {
            console.log('click')
            /* Escape placeName */
            const id = e.target.id
            const placeName = e.target.dataset.placeName

            cityInput.value = placeName

            zumeProfile.mapbox_selected_id = id

            addressResultsContainer.innerHTML = ''
        })
    })
}
