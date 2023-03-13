const API_URL = process.env.API_URL
    ? process.env.API_URL
    : 'https://www.drupal.org/api-d7/node.json'

export default async function fetchAPI(
    params: URLSearchParams,
    options: RequestInit & { data?: any } = {}
) {
    try {
        const res = await fetch(`${API_URL}?${params.toString()}`, {
            ...options,
            headers: {
                ...options.headers,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
        return await res.json()
    } catch (e: any) {
        if (e.message === 'cancelled') {
            // Cancelled by browser
            console.log('Request Cancelled by the Browser', e)
        } else {
            console.error('Network Error, CORS or timeout.')
        }
    }
}