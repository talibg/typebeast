import { storeManager } from './store'
import { authReadyPromise } from './authReady'

let originalFetch:
    | ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>)
    | undefined

export const fetchInterceptor = () => {
    if (originalFetch) return
    originalFetch = window.fetch

    window.fetch = async (url, options = {}) => {
        const urlString = url.toString()
        const method = options.method ? options.method.toUpperCase() : 'GET'

        const requiresAuthWait =
            !(method === 'GET' && urlString.includes('/api/v1/users')) &&
            !!(method === 'DELETE' && urlString.includes('/api/v1/sessions'))

        if (requiresAuthWait) {
            await authReadyPromise
        }

        const { token } = storeManager.getStore()

        const headers = new Headers(options.headers || {})
        const credentials = options.credentials || 'include'

        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        const modifiedOptions = {
            ...options,
            headers: headers,
            credentials,
        }

        const response = await originalFetch!(url, modifiedOptions)
        return response
    }
}
