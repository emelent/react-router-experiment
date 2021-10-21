import React, { useEffect, useState } from 'react'


const userToComponent = (user)  => (
    <div key={user.id}>
        <div>{user.name}</div> 
        <div>{user.email}</div> 
        <hr />
    </div>
)

export default function UserList({users, onUsersChanged, fetchUsersUseCase}){

    const [loading, setLoading] = useState(false) 
    const [abortController] = useState(new AbortController())

    const refreshUsers = () => {
        setLoading(true)
        fetchUsersUseCase(abortController)
            .then(onUsersChanged)
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        return () => {
            // cancel network call
            console.log("cancelling network call")
            abortController.abort()
        }
    }, [abortController])

    return (
        <div>
            {loading && "Loading ..."}
            {!loading && users.map(userToComponent)}
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