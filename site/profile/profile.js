const profileForm = document.getElementById('profile-form')
const nameInput = document.getElementById('full_name')
const phoneInput = document.getElementById('phone')
const emailInput = document.getElementById('email')
const cityInput = document.getElementById('city')
const prefferedLanguageInput = document.getElementById('preferred-language')
const addressResultsContainer = document.getElementById('address_results')

const old_preferred_language = prefferedLanguageInput.value

profileForm.addEventListener( 'submit', submitProfileForm )
function submitProfileForm(e) {
    e.preventDefault()

    const name = nameInput.value
    const email = emailInput.value
    const phone = phoneInput.value
    const preferred_language = prefferedLanguageInput.value

    const data = {
      name,
      phone,
      email,
      preferred_language,
    }

    data.location_grid_meta = getLocationGridFromMapbox(jsObject.mapbox_selected_id, jsObject.profile.location)

    /* start loading spinner */
    const submitButton = document.querySelector('#submit-profile')
    const loadingSpinner = document.querySelector('.loading-spinner')

    submitButton.setAttribute('disabled', true)
    loadingSpinner.classList.add('active')

    /* submit data to profile API endpoint */
    fetch( jsObject.rest_endpoint + '/profile', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-WP-Nonce': jsObject.nonce
        }
    } )
    .then((response) => response.json())
    .catch((error) => {
        console.error(error)
    })
    .finally(() => {
        submitButton.removeAttribute('disabled')
        loadingSpinner.classList.remove('active')
    })
}

const processLocation = debounce(getAddressSuggestions(addressCallback, jsObject.map_key))
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
            /* Escape placeName */
            const id = e.target.id
            const placeName = e.target.dataset.placeName

            cityInput.value = placeName

            jsObject.mapbox_selected_id = id

            addressResultsContainer.innerHTML = ''
        })
    })
}
