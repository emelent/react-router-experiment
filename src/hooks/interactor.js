import {
    useCallback,
    useEffect,
    useState
} from 'react'


const defaultConfig = {
    onSuccess: undefined,
    onError: undefined,
    onStart: undefined,
    onComplete: undefined,
}

function safeExecute(method, ...args) {
    if(typeof method !== 'function') return

    method(...args)
}

/**
 * This hook creates an environment for the safe execution of async 
 * an {Interactor Function} within a functional component, and
 * ensures that the interactor function is cancelled on component
 * unmount.
 * 
 * @param {Interactor Function} interactor function that returns a promise
 * @param {object} config configuration object with notification functions
 * 
 * @returns [loadingState, interactCaller, abortController]
 */
export function useInteractor(interactor, config=defaultConfig) {
    // prepare state
    const [loading, setLoading] = useState(false)
    const [abortController] = useState(new AbortController())

    // create callback that executes network call 
    const callback = useCallback(() => {
        // notify start
        safeExecute(config.onStart)

        // set loading state
        setLoading(true)


        // execute network call
        interactor(abortController.signal)
            .then((data) => safeExecute(config.onSuccess, data))
            .catch((err) => {
                if(err.name === 'AbortError') return

                // notify on error
                safeExecute(config.onError, err)
            })
            .finally(() => {
                // just return on abort to avoid
                // adjusting state for when abort is triggered by
                // unmount 
                if (abortController.signal.aborted) return

                // set loading state
                setLoading(false)

                // notify complete
                safeExecute(config.onComplete)
            })
    }, [abortController])

    // cancel request on unmount
    useEffect(() => {
        return () => abortController.abort()
    }, [abortController])

    return [loading, callback, abortController]
}