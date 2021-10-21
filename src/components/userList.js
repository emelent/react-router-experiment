import React, { useEffect, useState } from 'react'


const userToComponent = (onUserClicked) => (user, index)  => (
    <div key={user.id} onClick={() => onUserClicked(index)}>
        <div>{user.name}</div> 
        <div>{user.email}</div> 
        <hr />
    </div>
)

export default function UserList({
    users,
    onUsersChanged,
    onUserClicked,
    fetchUsersUseCase,
    // loading,
    // onLoadingChanged
}){

    const [abortController] = useState(new AbortController())
    const [loading, setLoading] = useState(false)

    const refreshUsers = () => {
        setLoading(true)
        fetchUsersUseCase(abortController)
            .then(onUsersChanged)
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        console.log("new abortController =>", abortController)
        return () => {
            // cancel network call
            console.log("cancelling network call")
            abortController.abort()
        }
    }, [abortController])

    return (
        <div>
            {loading && "Loading ..."}
            {!loading && users.map(userToComponent(onUserClicked))}
            <br/>
            <br/>
            {!loading && (
                <button onClick={refreshUsers}>Refresh Users</button>
            )}
            <br/>
            <br/>
        </div>
    )
}