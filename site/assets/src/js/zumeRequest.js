
class ZumeRequest {
    constructor(root, base, nonce) {
        this.root = root
        this.base = base
        this.nonce = nonce
    }

    /**
     * Send a fetch request to zume_system/v1 API endpoints
     *
     * @param {string} method GET, POST etc.
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    fetch(method, route, data = {}) {
        let base = this.base
        if (!this.base.endsWith('/') && !route.startsWith('/')) {
            base += '/';
        }

        let url = `${this.root}${base}${route}`

        if (method === 'GET' && Object.keys(data).length > 0) {
            const queryParams = new URLSearchParams(data)
            url += '?' + queryParams.toString()
        }

        return fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-WP-Nonce': this.nonce,
            },
            body: method === 'GET' ? null : JSON.stringify(data),
        } )
            .then((response) => {
                return Promise.all([
                    Promise.resolve(response.ok),
                    response.json()
                ])
            })
            .then(([ok, body]) => {
                if (!ok) {
                    throw new Error(body.code)
                }

                return body
            })
    }

    /**
     * Send a GET fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    get(route, data = {}) {
        return this.fetch('GET', route, data)
    }
    /**
     * Send a POST fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    post(route, data = {}) {
        return this.fetch('POST', route, data)
    }
    /**
     * Send a PUT fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    put(route, data = {}) {
        return this.fetch('PUT', route, data)
    }
    /**
     * Send an UPDATE fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    update(route, data = {}) {
        return this.fetch('UPDATE', route, data)
    }
    /**
     * Send a DELETE fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    delete(route, data = {}) {
        return this.fetch('DELETE', route, data)
    }
}

export const zumeRequest = new ZumeRequest(window.wpApiShare.root, 'zume_system/v1', window.wpApiShare.nonce)