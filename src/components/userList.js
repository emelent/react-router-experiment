import React, { useEffect, useState } from 'react'


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


export default function UserList({
    users,
    onUserClicked,
    fetchUsers,
    loading,
}){
    const [count, setCount] = useCounter()
    const counterClick = () => setCount(count + 1)

    return (
        <div>
            {loading && "Loading ..."}
            {!loading && users.map(userToComponent(onUserClicked))}
            <br/>
            <br/>
            {!loading && (
                <button onClick={fetchUsers}>Fetch Users</button>
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