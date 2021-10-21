export function throwNetworkErrorOperator(response) {
    if (!response.ok) throw new NetworkError(response)

    return response
}

/**
 * @param response Fetch API response
 * @returns Fetch API response
 */
export function toJsonOperator(response) {
    return response.json()
}

export class NetworkError extends Error {
    constructor(response, message) {
        super(message? message: `${response.status}:${response.url}`)
        this.url = response.url
        this.status = response.status
    }
}
