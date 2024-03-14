import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'

export class ShareList extends LitElement {
    static get properties() {
        return {
            items: { type: Array, attribute: false },
            filterType: { type: String, attribute: false },
            isSortedAlphabetically: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()
        this.items = zumeShare.share_items
        this.filterType = 'all'
    }

    filterItems(filterType) {
        this.filterType = filterType

        this.items = this.sortItems(zumeShare.share_items.filter(({ type }) => {
            if (filterType === 'all') {
                return true
            }

            return type === filterType
        }))
    }
    toggleSorting() {
        this.isSortedAlphabetically = !this.isSortedAlphabetically

        this.items = this.sortItems(this.items)
    }
    sortItems(items) {
        return items.sort((a, b) => {
            return this.isSortedAlphabetically ? this.sortAlphabetically(a, b) : this.sortByKey(a, b)
        })

    }
    sortAlphabetically = (a, b) => {
        return a.page_title < b.page_title ? -1 : 1
    }
    sortByKey = (a, b) => {
        return Number(a.key) < Number(b.key) ? -1 : 1
    }

    renderListItem({ page_url, page_title, type }) {
        /* WARNING this list item is a copy of the one in share.php for noscript users */
        return html`
            <li class="share-cards" data-type=${type}>
                <div class="stack | share card">
                    <a class="f-0 bold my-0" href=${page_url}>
                        ${page_title}
                    </a>
                    <div class="center">
                        <share-links
                            url=${page_url}
                            title=${page_title}
                            .t=${zumeShare.translations}>
                        </share-links>
                    </div>
                </div>
            </li>
        `
    }

    render() {
        return html`
            <div class="filter-area d-flex align-items-center justify-flex-end">
                <button
                    class="icon-btn f-2 ${this.isSortedAlphabetically ? 'bg-brand-fade' : ''}"
                    @click=${this.toggleSorting}
                >
                    <span class="visually-hidden">${zumeShare.translations.sort}</span>
                    <svg class="w-2rem brand-light" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.93 2.65c-.2-.2-.51-.2-.71 0l-2.01 2.01h4.72zm-.7 18.7c.2.2.51.2.71 0l1.98-1.98h-4.66zm-1.25-3.62c.6 0 1.01-.6.79-1.16L8.04 7.03c-.18-.46-.63-.76-1.12-.76-.49 0-.94.3-1.12.76l-3.74 9.53c-.22.56.19 1.16.79 1.16.35 0 .67-.22.8-.55l.71-1.9h5.11l.71 1.9c.13.34.45.56.8.56m-6.01-4.09 1.94-5.18 1.94 5.18zm16.08 2.5h-5.33l5.72-8.29c.46-.66-.02-1.57-.82-1.57h-6.48c-.44 0-.79.36-.79.8v.01c0 .44.36.8.79.8h5.09l-5.73 8.28c-.46.66.02 1.57.82 1.57h6.72c.44 0 .79-.36.79-.79.02-.45-.34-.81-.78-.81"></path></svg>
                </button>
                <button class="icon-btn f-2" data-toggle="filter-menu">
                    <span class="visually-hidden">${zumeShare.translations.filter}</span>
                    <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                </button>
            </div>
            <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="center" data-close-on-click="true" data-close-on-click-inside="true">
                <ul>
                    <li>
                        <button
                            class="menu-btn w-100 filter-button ${this.filterType === 'all' ? 'selected' : ''}"
                            @click=${() => this.filterItems('all')}
                        >
                            ${zumeShare.translations.all}
                        </button>
                        <button
                            class="menu-btn w-100 filter-button ${this.filterType === 'tool' ? 'selected' : ''}"
                            @click=${() => this.filterItems('tool')}
                        >
                            ${zumeShare.translations.tools}
                        </button>
                        <button
                            class="menu-btn w-100 filter-button ${this.filterType === 'concept' ? 'selected' : ''}"
                            @click=${() => this.filterItems('concept')}
                        >
                            ${zumeShare.translations.concepts}
                        </button>
                    </li>
                </ul>
            </div>
            <ul class="stack container-xsm | mt-0">

                ${
                    repeat(this.items, (share_item) => share_item.key, this.renderListItem)
                }

            </ul>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('share-list', ShareList);
