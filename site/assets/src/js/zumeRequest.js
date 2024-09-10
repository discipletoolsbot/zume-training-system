
class ZumeRequest {
    constructor(root, base, nonce) {
        this.root = root
        this.base = base
        this.nonce = nonce

        this.fetch = this.fetch.bind(this)
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
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
    fetch(method, route, data = {}, base = '') {
        let thisBase = this.base
        if (base.length > 0) {
            thisBase = base
        }

        if (!this.base.endsWith('/') && !route.startsWith('/')) {
            thisBase += '/';
        }

        let url = `${this.root}${thisBase}${route}`

        if (method === 'GET' && Object.keys(data).length > 0) {
            const queryParams = new URLSearchParams(data)
            url += '?' + queryParams.toString()
        }

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-WP-Nonce': this.nonce,
            },
            body: method === 'GET' ? null : JSON.stringify(data),
        })
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
    get(route, data = {}, base = '') {
        return this.fetch('GET', route, data, base)
    }
    /**
     * Send a POST fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    post(route, data = {}, base = '') {
        return this.fetch('POST', route, data, base)
    }
    /**
     * Send a PUT fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    put(route, data = {}, base = '') {
        return this.fetch('PUT', route, data, base)
    }
    /**
     * Send an UPDATE fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    update(route, data = {}, base = '') {
        return this.fetch('UPDATE', route, data, base)
    }
    /**
     * Send a DELETE fetch request to zume_system/v1 API endpoints
     *
     * @param {string} route plans, complete-post etc.
     * @param {Object} data
     *
     * @returns Promise
     */
    delete(route, data = {}, base = '') {
        return this.fetch('DELETE', route, data, base)
    }
}

export const zumeRequest = new ZumeRequest(window.zumeApiShare.root, 'zume_system/v1', window.zumeApiShare.nonce)
// only for use in PHP files ;)
window.zumeRequest = zumeRequest