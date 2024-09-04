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
            locationLabel: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.route = DashBoard.getRoute('my-churches')

        this.churches = [...jsObject.churches ?? []]
        this.orderedChurches = []
        this.orderChurches()

        this.locationLabel = ''

        this.sortedChurches = [...jsObject.churches ?? []]
        this.sortedChurches.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)

        this.renderChurch = this.renderChurch.bind(this)
        this.addChurch = this.addChurch.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

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
    }
    updated() {
        jQuery(this.renderRoot).foundation();
    }

    initialiseMap() {

        let center, zoom
        if ( this.lng ) {
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

            if ( this.active_marker ) {
                this.active_marker.remove()
            }
            this.active_marker = new mapboxgl.Marker()
                .setLngLat(e.lngLat )
                .addTo(this.map);

            this.locationLabel = ''
        }).bind(this))

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            types: 'country region district locality neighborhood address place',
            mapboxgl: mapboxgl
        });
        this.map.addControl(geocoder, 'top-left' );
        geocoder.on('result', (function(e) { // respond to search
            console.log(e)
            if ( this.active_marker ) {
                this.active_marker.remove()
            }
            this.active_marker = new mapboxgl.Marker()
                .setLngLat(e.result.center)
                .addTo(this.map);
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
            console.log(e)
            if (this.active_marker) {
                this.active_marker.remove()
            }

            let lat = e.coords.latitude
            let lng = e.coords.longitude

            this.lat = lat
            this.lng = lng

            this.active_marker = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(this.map);

            this.locationLabel = ''
        }).bind(this))
    }

    joinCommunity() {
        this.dispatchEvent(new CustomEvent('open-wizard', { bubbles: true, detail: { type: Wizards.joinCommunity } }))
    }

    orderChurches() {
        const rootNodes = this.churches.filter((church) => !church.parent)

        for (const rootNode of rootNodes) {
            this.processChurch(rootNode.id, 0)
        }
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

        this.addChurch()
    }
    addChurch() {
        /* Get details from modal */
        /* Post new church up to API */
        /* Insert church into the churches and reorder */

        /*
                        location_grid_meta: {
                    values: [
                        {
                            lng: lng,
                            lat: lat,
                            source: 'user'
                        }
                    ],
                    force_values: window.force_values
                }
        */

        this.closeChurchModal()
    }
    editChurch(id) {
        console.log('edit church', id)
    }
    deleteChurch(id) {
        console.log('delete church', id)
    }

    openChurchModal() {
        if (this.showTeaser) {
            return
        }
        const modal = document.querySelector('#new-church-form')
        jQuery(modal).foundation('open')

        this.initialiseMap()
    }

    closeChurchModal() {
        const modal = document.querySelector('#new-church-form')
        jQuery(modal).foundation('close')
        this.clearChurchModal()
    }
    clearChurchModal() {
        jQuery('#add-church-form input').each(function(value) {
            this.value = ''
        })
    }

    renderChurchOption({ id, name }) {
        return html`
            <option value=${id}>${name}</option>
        `
    }
    renderChurch({id, name, location, generation }) {
        return html`
            <li
                class="list__item"
                data-depth=${generation-1}
                style=${`--depth: ${generation-1}`}
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
                        <li><button class="menu-btn" @click=${() => this.editChurch(id)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${() => this.deleteChurch(id)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button></li>
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
                            <button class="icon-btn f-2" @click=${this.openChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
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

                <div class="dashboard__main content">
                    ${
                        this.showTeaser
                        ? html`
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

                        `
                        : html`
                            <ul class="list">
                                ${
                                    this.orderedChurches.length === 0
                                    ? html`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            data-depth=${0}
                                            @click=${this.openChurchModal}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    `
                                    : repeat(this.orderedChurches, (church) => `${church.id}`, this.renderChurch)
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
                    <div id="add-church-form">
                        <div>
                            <label for="church-name">${jsObject.translations.church_name}</label>
                            <input id="church-name" name="church-name" type="text" />
                        </div>
                        <div>
                            <label for="church-start-date">${jsObject.translations.start_date}</label>
                            <input id="church-start-date" name="church-start-date" type="date" />
                        </div>
                        <div>
                            <label for="number-of-people">${jsObject.translations.number_of_people}</label>
                            <input id="number-of-people" name="number-of-people" type="number" />
                        </div>
                        <div>
                            <label for="church-location">${jsObject.translations.church_location}</label>
                            <span id="location-label">${this.locationLabel}</span>
                            <div id="map-wrapper-edit" style="height: 300px">
                                <div id='map-edit' style="height: 300px"></div>
                            </div>
                        </div>
                        <div>
                            <label for="parent-church">${jsObject.translations.parent_church}</label>
                            <select id="parent-church" name="parent-church" >
                                <option value="">---</option>
                                ${
                                    repeat(this.sortedChurches, ({id}) => id, this.renderChurchOption)
                                }
                            </select>
                        </div>
                        <div class="cluster">
                            <button class="btn" @click=${this.addChurch}>${jsObject.translations.add_new_church}</button>
                            <button class="btn outline" type="button" @click=${this.closeChurchModal}>${jsObject.translations.cancel}</button>
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
