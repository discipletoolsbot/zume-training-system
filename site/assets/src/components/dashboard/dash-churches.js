import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashPage } from './dash-page';
import { DashBoard } from './dash-board';
import { zumeRequest } from '../../js/zumeRequest';
import { Wizards } from '../wizard/wizard-constants';

export class DashChurches extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            orderedChurches: { type: Array, attribute: false },
            sortedChurches: { type: Array, attribute: false },
            locationLabel: { type: String, attribute: false },
            formErrors: { type: Boolean, attribute: false },
            loading: { type: Boolean, attribute: false },
            errorMessage: { type: String, attribute: false },
            confirmDelete: { type: Number, attribute: false },
            mode: { type: String, attribute: false },
        };
    }

    lng
    lat
    level
    locationLabel
    mode

    constructor() {
        super()
        this.showTeaser = false
        this.route = DashBoard.getRoute('my-churches')

        this.churches = [...jsObject.churches ?? []]
        this.orderedChurches = []
        this.sortedChurches = []
        this.orderChurches()

        this.locationLabel = ''
        this.formErrors = false
        this.errorMessage = ''


        this.renderChurch = this.renderChurch.bind(this)
        this.addChurch = this.addChurch.bind(this)
        this.editChurch = this.editChurch.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.orderChurches = this.orderChurches.bind(this)
        this.deleteChurch = this.deleteChurch.bind(this)
        this.addMarkerToMap = this.addMarkerToMap.bind(this)

        /* Remove old overlays that have been orphaned by moving around the app */
        document.querySelectorAll('.reveal-overlay #new-church-form').forEach((element) => {
            element.parentElement.remove()
        })

        mapboxgl.accessToken = jsObject.map_key;
    }

    firstUpdated() {
        super.firstUpdated()
        const addChurchForm = document.querySelector('#add-church-form')
        addChurchForm.addEventListener('submit', this.handleSubmit)

        this.initialiseChurchEventHandlers()
    }
    updated() {
        jQuery(this.renderRoot).foundation();
    }

    initialiseChurchEventHandlers() {
        const kebabMenus = this.renderRoot.querySelectorAll('.dropdown-pane')
        kebabMenus.forEach((kebabMenu) => {
            jQuery(kebabMenu).on('hide.zf.dropdown', () => {
                this.confirmDelete = ''
            })
        })
    }
    initialiseMap() {

        let center, zoom
        if (this.lng) {
            center = [this.lng, this.lat]
            zoom = 5
        } else {
            center = [-20, 30]
            zoom = 1
        }
        this.map = new mapboxgl.Map({
            container: 'map-edit',
            style: 'mapbox://styles/mapbox/light-v10',
            center: center,
            zoom: zoom
        });

        this.map.on('click', (function (e) {
            let lng = e.lngLat.lng
            let lat = e.lngLat.lat

            this.lng = lng
            this.lat = lat

            if (this.active_marker) {
                this.active_marker.remove()
            }
            this.addMarkerToMap(e.lngLat)

            this.locationLabel = ''
        }).bind(this))

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            types: 'country region district locality neighborhood address place',
            mapboxgl: mapboxgl
        });
        this.map.addControl(geocoder, 'top-left');
        geocoder.on('result', (function (e) { // respond to search
            if (this.active_marker) {
                this.active_marker.remove()
            }
            this.addMarkerToMap(e.result.center)
            geocoder._removeMarker()

            this.lng = e.result.center[0]
            this.lat = e.result.center[1]
            this.level = e.result.place_type[0]
            this.locationLabel = e.result.place_name

        }).bind(this))

        let userGeocode = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            marker: {
                color: 'orange'
            },
            trackUserLocation: false,
            showUserLocation: false
        })
        this.map.addControl(userGeocode, 'top-left');
        userGeocode.on('geolocate', (function (e) { // respond to search
            if (this.active_marker) {
                this.active_marker.remove()
            }

            let lat = e.coords.latitude
            let lng = e.coords.longitude

            this.lat = lat
            this.lng = lng

            this.addMarkerToMap({ lng, lat })

            this.locationLabel = ''
        }).bind(this))
    }

    addMarkerToMap(latLng) {
        let lat, lng
        if (Array.isArray(latLng)) {
            lng = latLng[0]
            lat = latLng[1]
        } else {
            lat = latLng.lat
            lng = latLng.lng
        }
        const center = [
            lng,
            lat,
        ]
        this.active_marker = new mapboxgl.Marker()
            .setLngLat(center)
            .addTo(this.map);
    }

    joinCommunity() {
        this.dispatchEvent(new CustomEvent('open-wizard', { bubbles: true, detail: { type: Wizards.joinCommunity } }))
    }

    orderChurches() {
        this.orderedChurches = []
        this.sortedChurches = [
            ...this.churches.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
        ]
        const rootNodes = this.churches.filter((church) => !church.parent)

        for (const rootNode of rootNodes) {
            this.processChurch(rootNode.id, 0)
        }

        this.orderedChurches = [...this.orderedChurches]
    }

    processChurch(churchID, generation) {
        const newGeneration = generation + 1

        const church = this.churches.find((church) => church.id === churchID)

        if (!church) {
            console.log(churchID, 'not found')
            return
        }

        church.generation = newGeneration

        this.orderedChurches.push(church)

        church.children.forEach((id) => {
            this.processChurch(id, newGeneration)
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (this.mode === 'add') {
            this.addChurch()
        } else {
            this.editChurch(this.churchId)
        }
    }
    addChurch() {
        this.postChurch((result) => {
            this.churches = [
                result,
                ...this.churches
            ].map((church) => {
                if (result.parent && church.id === result.parent) {
                    return {
                        ...church,
                        children: [
                            ...church.children,
                            result.id
                        ]
                    }
                }
                return church
            })
            this.orderChurches()

            this.closeChurchModal()
        })
    }
    postChurch(successCallback) {
        this.loading = true
        this.formErrors = false

        document.querySelector('#add-church-form .loading-spinner').classList.add('active')

        if (
            !this.lat ||
            !this.lng ||
            !this.churchName ||
            !this.startDate ||
            !this.churchMembers
        ) {
            this.formErrors = true
            document.querySelector('#add-church-form .loading-spinner').classList.remove('active')
            return
        }

        /* Post new church up to API */
        const data = {
            name: this.churchName,
            member_count: this.churchMembers,
            start_date: this.startDate,
            location_grid_meta: {
                values: [],
                force_values: true
            }
        }

        if (this.parentChurch) {
            data.parent_church = this.parentChurch
        }

        const churchLocation = {
            lng: this.lng,
            lat: this.lat,
            source: 'user'
        }

        if (this.level && this.locationLabel) {
            churchLocation.level = this.level
            churchLocation.label = this.locationLabel
        }

        if (this.mode === 'edit' && this.churchId) {
            data.post_id = this.churchId
        }

        data.location_grid_meta.values.push(churchLocation)

        const doRequest = this.mode === 'add' ? zumeRequest.post : zumeRequest.put
        /* Insert church into the churches and reorder */
        doRequest('church', data)
            .then((result) => {
                successCallback(result)
            })
            .catch((error) => {
                console.error(error)
                this.showErrorMessage(message);
            })
            .finally(() => {
                this.loading = false
                document.querySelector('#add-church-form .loading-spinner').classList.remove('active')
            })
    }
    showErrorMessage(message) {
        this.errorMessage = message || jsObject.translations.error;
        setTimeout(() => {
            this.errorMessage = '';
        }, 3000);
    }

    editChurch() {
        this.postChurch((result) => {
            /* This edit, could have moved the node in the graph */
            this.churches = this.churches.map((church) => {
                /* Update the church in place */
                if (church.id === result.id) {
                    return result
                }
                /* Ensure that the edited church is in it's parent's children array */
                if (result.parent && church.id === result.parent && !church.children.includes(result.id)) {
                    return {
                        ...church,
                        children: [
                            ...church.children,
                            result.id,
                        ]
                    }
                }
                /* Make sure that the edited church isn't in any other church's children array */
                if (
                    (church.id !== result.parent && church.children.includes(result.id)) ||
                    !result.parent && church.children.includes(result.id)
                ) {
                    return {
                        ...church,
                        children: church.children.filter((childID) => childID !== result.id)
                    }
                }

                return church
            })
            this.orderChurches()

            this.closeChurchModal()
        })
    }
    confirmDeleteChurch(id) {
        this.confirmDelete = id
    }
    deleteChurch(id) {
        /* Remove the church from the graph */
        const deletedChurch = this.churches.find((church) => church.id === id)
        const deletedChurchPosition = this.churches.findIndex((church) => church.id === id)
        const childChurchIds = []
        this.churches = this.churches
            .filter((church) => church.id !== id)
            .map((church) => {
                if (church.parent === id) {
                    childChurchIds.push(church.id)
                    return {
                        ...church,
                        parent: null,
                    }
                }
                return church
            })

        this.orderChurches()

        zumeRequest.delete('church', { church_id: id })
            .then((result) => {})
            .catch((error) => {
                console.error(error)
                this.showErrorMessage()

                /* Insert the church back into the graph */
                this.churches = [
                    ...this.churches.slice(0, deletedChurchPosition),
                    deletedChurch,
                    ...this.churches.slice(deletedChurchPosition)
                ].map((church) => {
                    if (childChurchIds.includes(church.id)) {
                        return {
                            ...church,
                            parent: id
                        }
                    }
                    return church
                })
                this.orderChurches()
            })
    }

    openAddChurchModal() {
        this.mode = 'add'
        this.clearChurchModal()
        document.querySelector('.submit-button-text').textContent = jsObject.translations.add_new_church
        this.openChurchModal()
    }
    openEditChurchModal(id) {
        this.mode = 'edit'
        document.querySelector('.submit-button-text').textContent = jsObject.translations.edit

        const church = this.churches.find((church) => church.id === id)
        this.churchId = id
        this.churchName = church.name
        this.churchMembers = church.member_count
        this.startDate = church.start_date.formatted
        this.lat = church.location_meta.lat
        this.lng = church.location_meta.lng
        this.locationLabel = church.location_meta.label
        this.level = church.location_meta.level
        this.parentChurch = church.parent


        this.openChurchModal()
    }
    openChurchModal() {
        if (this.showTeaser) {
            return
        }
        const modal = document.querySelector('#new-church-form')
        jQuery(modal).foundation('open')

        document.getElementById('church-name').value = this.churchName || ''
        document.getElementById('number-of-people').value = this.churchMembers || ''
        document.getElementById('location-label').innerText = this.locationLabel || ''
        document.getElementById('church-start-date').value = this.startDate || ''
        document.getElementById('parent-church').value = `${this.parentChurch}` || ''

        this.initialiseMap()

        if (this.lat) {
            this.addMarkerToMap({ lat: this.lat, lng: this.lng })
        }
    }

    closeChurchModal() {
        const modal = document.querySelector('#new-church-form')
        jQuery(modal).foundation('close')
        this.clearChurchModal()
    }
    clearChurchModal() {
        jQuery('#add-church-form input').each(function (value) {
            this.value = ''
        })
        document.querySelector('#add-church-form select').value = ''
        this.churchName = ''
        this.churchMembers = ''
        this.locationLabel = ''
        this.startDate = ''
        this.lat = undefined
        this.lng = undefined
        this.parentChurch = undefined
    }
    closeKebabMenu(id) {
        const kebabMenu = this.renderRoot.querySelector(`#kebab-menu-${id}`)

        if (!kebabMenu) {
            console.log('kebab menu not found', id)
        }
        jQuery(kebabMenu).foundation('close')
    }

    renderChurchOption({ id, name }) {
        return html`
            <option value=${id}>${name}</option>
        `
    }
    renderChurch({ id, name, location, generation }) {
        return html`
            <li
                class="list__item"
                data-depth=${generation - 1}
                style=${`--depth: ${generation - 1}`}
            >
                <div class="list__primary f-medium" data-large-gap>
                    <span>${name}</span>
                    <span>${location}</span>
                </div>
                <div class="list__secondary">
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="${!!this.confirmDelete ? 'hidden' : ''}">
                            <button class="menu-btn" @click=${() => this.openEditChurchModal(id)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button>
                        </li>
                        <li class="${!!this.confirmDelete ? 'hidden' : ''}">
                            <button class="menu-btn red ${!!this.confirmDelete ? 'hidden' : ''}" @click=${() => this.confirmDeleteChurch(id)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button>
                        </li>
                        <li class="${!!this.confirmDelete ? '' : 'hidden'} stack">
                            <p class="bold f-1">${jsObject.translations.delete}?</p>
                            <div class="cluster">
                                <button class="btn outline tight" @click=${() => this.closeKebabMenu(id)}>
                                    ${jsObject.translations.no}
                                </button>
                                <button class="btn tight red" @click=${() => this.deleteChurch(id)}>
                                    ${jsObject.translations.yes}
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        `
    }

    render() {
        return html`
            <div class="dashboard__content" data-no-secondary-area>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openAddChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main content position-relative">
                    ${
                        this.showTeaser ? html`
                            <div class="p-2">
                                <div class="dash-menu__list-item">
                                    <div class="dash-menu__icon-area | stack--5">
                                        <span class="icon z-icon-locked dash-menu__list-icon"></span>
                                    </div>
                                    <div class="dash-menu__text-area | switcher | switcher-width-20">
                                        <div>
                                            <h3 class="f-1 bold uppercase">${jsObject.translations.my_churches_locked}</h3>
                                            <p>${jsObject.translations.my_churches_locked_explanation}</p>
                                        </div>
                                        <!-- This needs to change to open the join community wizard instead -->
                                        <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                            ${jsObject.translations.join}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ` : html`
                            <ul class="list">
                                ${
                                    this.orderedChurches.length === 0 ? html`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            data-depth=${0}
                                            @click=${this.openAddChurchModal}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    ` : repeat(this.orderedChurches, (church) => `${church.id}`, this.renderChurch)
                                }
                            </ul>

                        `
                    }


                </div>

            </div>
            <div class="reveal medium" id="new-church-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.clearChurchModal}>
                        <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <h2>${jsObject.translations.my_churches}</h2>
                    <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
                    <div id="add-church-form" class="stack">
                        <div class="form-group">
                            <label for="church-name">${jsObject.translations.church_name}*</label>
                            <input class="input" id="church-name" name="church-name" type="text" value=${this.churchName || ''} @change=${(e) => this.churchName = e.target.value}/>
                            ${
                                this.formErrors && !this.churchName ? html`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                ` : ''
                            }
                        </div>
                        <div class="form-group">
                            <label for="church-start-date">${jsObject.translations.start_date}*</label>
                            <input class="input" id="church-start-date" name="church-start-date" type="date" value=${this.startDate || ''} @change=${(e) => this.startDate = e.target.value} />
                            ${
                                this.formErrors && !this.startDate ? html`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                ` : ''
                            }
                        </div>
                        <div class="form-group">
                            <label for="number-of-people">${jsObject.translations.number_of_people}*</label>
                            <input class="input" id="number-of-people" name="number-of-people" type="number" value=${this.churchMembers} @change=${(e) => this.churchMembers = e.target.value} />
                            ${
                                this.formErrors && !this.churchMembers ? html`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                ` : ''
                            }
                        </div>
                        <div class="form-group">
                            <label for="church-location">${jsObject.translations.church_location}*</label>
                            <span id="location-label">${this.locationLabel}</span>
                            ${
                                this.formErrors && !this.lat ? html`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                ` : ''
                            }
                            <div id="map-wrapper-edit" style="height: 300px">
                                <div id='map-edit' style="height: 300px"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="parent-church">${jsObject.translations.parent_church}</label>
                            <select id="parent-church" name="parent-church" @change=${(e) => this.parentChurch = e.target.value} >
                                <option value="">---</option>
                                ${
                                    repeat(this.sortedChurches, ({ id }) => id, this.renderChurchOption)
                                }
                            </select>
                        </div>
                        <div class="cluster">
                            <button class="btn outline" type="button" ?disabled=${this.loading} aria-disabled=${this.loading ? 'true' : 'false'} @click=${this.closeChurchModal}>${jsObject.translations.cancel}</button>
                            <button class="btn" @click=${this.handleSubmit}>
                                <span class="submit-button-text">${jsObject.translations.add_new_church}</span>
                                <span class="loading-spinner"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-churches', DashChurches);
