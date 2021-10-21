import {
    throwNetworkErrorOperator,
    toJsonOperator
} from "../networking/helpers"

const baseUrl = 'https://jsonplaceholder.typicode.com/users'

export const createFetchCaller =
    (request, requestInfo) =>
    () => fetch(request, requestInfo)


export function createFetchUsersUseCase() {
    return (abortController) => fetch(baseUrl, {
            signal: abortController.signal
        })
        .then(throwNetworkErrorOperator)
        .then(toJsonOperator)
}


export function createSaveUserUseCase() {
    return (user) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(user)
        }, 3000)
    })
}