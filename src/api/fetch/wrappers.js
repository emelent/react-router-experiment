import { toJsonSafeOperator } from "./operators";

export const jsonFetch = 
    (requestInfo, requestInit) => 
        fetch(requestInfo, requestInit)
            .then(toJsonSafeOperator)
