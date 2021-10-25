import {
    useCallback,
    useEffect,
    useState
} from 'react'

import {
    toJsonSafeOperator
} from "../networking/helpers"


export function useInteractor(interactor, onResult, onError) {
    const [loading, setLoading] = useState(false)
    const [abortController, setAbortController] = useState(new AbortController())

    const callback = useCallback(() => {
        setLoading(true)
        interactor(abortController)
            .then(toJsonSafeOperator)
            .then(onResult)
            .catch((err) => {
                if(err.name === 'AbortError') return
                onError && onError(err)
            })
            .finally(() => {
                if (abortController.signal.aborted) return

                setLoading(false)
                setAbortController(new AbortController())
            })
    }, [abortController])

    useEffect(() => {
        return () => abortController.abort()
    }, [abortController])

    return [loading, callback, abortController]
}