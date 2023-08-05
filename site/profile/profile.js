const profileForm = document.getElementById('profile-form')
const nameInput = document.getElementById('full_name')
const phoneInput = document.getElementById('phone')
const emailInput = document.getElementById('email')
const cityInput = document.getElementById('city')
const addressResultsContainer = document.getElementById('address_results')

function debounce(callback, timeout = 500) {
    let timer

    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(this, ...args)
        }, timeout)
    }
}

profileForm.addEventListener( 'submit', submitProfileForm )
function submitProfileForm(e) {
    e.preventDefault()

    const name = nameInput.value
    const phone = phoneInput.value

    /* get the location_grid from mapbox selection */
    const id = zumeProfile.mapbox_selected_id

    let location_grid_meta = ''

    if ( id === 'curent' ) {
        location_grid_meta = zumeProfile.profile.location_grid_meta
    } else if ( id && id !== '' && window.mapbox_results ) {
        const location_meta = window.mapbox_results.features.find((feature) => feature.id === id)
        location_grid_meta = {
            lng: location_meta.center[0],
            lat: location_meta.center[1],
            level: location_meta.place_type[0],
            label: location_meta.place_name,
            source: 'user',
            grid_id: false
        }
    }

    const data = {
        name,
        phone,
        location_grid_meta,
    }

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
    })
}

const processLocation = debounce(getAddressSuggestions)
cityInput.addEventListener( 'input', processLocation )

function getAddressSuggestions(event) {
    const address = event.target.value

    if (address.length < 1) {
        return
    }


    const root = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const settings = '.json?types=country,region,postcode,district,place,locality,neighborhood,address&limit=6&access_token='
    const key = zumeProfile.map_key

    const url = root + encodeURI( address ) + settings + key

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.features.length < 1) {
                addressResultsContainer.innerHTML = `
                    No Locations Found
                ` /* TODO: translate and escape me */
            }

            window.mapbox_results = data

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
                result.addEventListener('click', (e) => {
                    /* Escape placeName */
                    const id = e.target.id
                    const placeName = e.target.dataset.placeName

                    cityInput.value = placeName

                    zumeProfile.mapbox_selected_id = id

                    addressResultsContainer.innerHTML = ''
                })
            })
        })

}
