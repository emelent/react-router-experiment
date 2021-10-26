import { jsonFetch } from "./fetch/wrappers"

const baseUrl = 'https://jsonplaceholder.typicode.com/users'

export const createFetchCaller =
    (request, requestInfo) =>
    () => fetch(request, requestInfo)


// export function createFetchUsersUseCase() {
//     return (abortController) => fetch(baseUrl, {
//             signal: abortController.signal
//         })
// }

export function fetchUsersInteractor(signal) {
    return jsonFetch(baseUrl, {signal})
}


// export function createSaveUserUseCase() {
//     return (user) => new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(user)
//         }, 3000)
//     })
// }