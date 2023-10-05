/**
 * Utilities for the profile page
 */

/**
 * Debounce the callback by timout milliseconds
 *
 * @param {function} callback
 * @param {number} [timeout=500]
 *
 * @returns {function}
 */
function debounce(callback, timeout = 500) {
    let timer

    return function(...args) {
        const context = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(context, ...args)
        }, timeout)
    }
}

/**
 * Get the location_grid_meta for DT
 *
 * @param {string|int} mapbox_selected_id
 * @param {object} currentLocation
 *
 * @returns {object}
 */
function getLocationGridFromMapbox(mapbox_selected_id, currentLocation) {
    const id = mapbox_selected_id
    let location_grid_meta = {}
    if (id === 'current' && currentLocation.source === 'ip') {
        location_grid_meta = {
            lng: currentLocation.lng,
            lat: currentLocation.lat,
            level: currentLocation.level,
            label: currentLocation.label,
            source: 'user',
            grid_id: false
        }
    }
    else if (id && id !== '' && window.mapbox_results) {
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
    return location_grid_meta
}

/**
 * Get a list of results from mapbox geocoding
 *
 * Attach the output function as the event handler of a location input field.
 *
 * @param {Function} dataCallback
 * @param {string} mapboxKey
 *
 * @returns {function}
 */
function getAddressSuggestions(dataCallback, mapboxKey) {

    return (event) => {

        const address = event.target.value

        if (address.length < 1) {
            return
        }

        const root = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        const settings = '.json?types=country,region,postcode,district,place,locality,neighborhood,address&limit=6&access_token='
        const key = mapboxKey

        const url = root + encodeURI( address ) + settings + key

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if ( data.features.length !== 0 ) {
                    window.mapbox_results = data
                }

                dataCallback(data)
            })
    }
}
