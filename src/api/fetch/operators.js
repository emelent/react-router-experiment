import { NetworkError } from "./networkError"

/**
 * Throws a NetworkError on unsuccessful network response.
 * 
 * @param {*} response 
 * @returns {Response}
 */
export function throwNetworkErrorOperator(response) {
    if (!response.ok) throw new NetworkError(response)

    return response
}

/**
 * Parse response from JSON
 * @param response Fetch API response
 * @returns {Response} an object
 */
export function toJsonOperator(response) {
    return response.json()
}

/**
 * Logs 
 * @param response Fetch API response
 * @returns {Response} 
 */
export function logOperator(response) {
    console.log("response =>", response)
    return response
}

/**
 * Pipes the operators in the order that they are given.
 * 
 * @param {Response} response Fetch API response
 * @param {[operators]} operators List of operators 
 * @returns {Response}
 */
export function pipe(response, ...operators) {
    return operators.reduce((currOp, nextOp) => nextOp(currOp), response)
}

/**
 * 
 * @param {*} response 
 * @returns 
 */
export function toJsonSafeOperator(response) {
    return pipe(response, throwNetworkErrorOperator, toJsonOperator)
}

