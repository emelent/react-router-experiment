export class NetworkError extends Error {
    constructor(response, message) {
        super(message? message: `${response.status}:${response.url}`)
        this.url = response.url
        this.status = response.status
    }
}