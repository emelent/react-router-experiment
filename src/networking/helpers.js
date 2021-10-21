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

export class NetworkError {
    constructor(response) {
        this.url = response.url
        this.status = response.status
    }
}
