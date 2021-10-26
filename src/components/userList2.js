import React, { useEffect, useState } from 'react'
import { useInteractor } from '../hooks/interactor';


const userToComponent = (onUserClicked) => (user, index)  => (
    <div key={user.id} onClick={() => onUserClicked(index)}>
        <div>{user.name}</div> 
        <div>{user.email}</div> 
        <hr />
    </div>
)

function useCounter() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log(`You clicked ${count} times`)
    }, [count]);

    return [count, setCount]
}


export default function UserList2({
    users,
    onUsersChanged,
    onUserClicked,
    fetchUsersUseCase,
}){
    const [loading, refreshUsers] = useInteractor(
        fetchUsersUseCase, 
        onUsersChanged,
        err => console.log("network failed =>", err)
    )

    const [count, setCount] = useCounter()
    const counterClick = () => setCount(count + 1)

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
            <p>You clicked {count} times</p>
            <button onClick={counterClick}>
                Click me
            </button>
        </div>
    )
}