import React, {useState} from 'react'
import {
  Switch,
  Route,
  MemoryRouter,
} from "react-router-dom";
import { createFetchUsersUseCase } from '../api/usersApi';

import UserList from '../components/userList'



export default function UsersContainer() {
    // state
    const [users, setUsers] = useState([])

    // use cases
    const fetchUsersUseCase = createFetchUsersUseCase()


    // views
    const Main = () => {
    return (
        <UserList
        users={users}
        onUsersChanged={setUsers}
        fetchUsersUseCase={fetchUsersUseCase}
        />
    )
    }

    return (
    <MemoryRouter>
        <Switch>
        <Route exact path="/" component={Main} />
        </Switch>
    </MemoryRouter>
    );
}