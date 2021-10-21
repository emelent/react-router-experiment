import React, {useState} from 'react'
import {
  Switch,
  Route,
  MemoryRouter,
  useHistory
} from "react-router-dom";
import { createFetchUsersUseCase } from '../api/usersApi';

import UserList from '../components/userList'


const abortController = new AbortController()

export default function UsersContainer() {
    // state
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)

    // use cases
    const fetchUsersUseCase = createFetchUsersUseCase()


    // views
    // user view
    // user name edit view
    // user email edit view
    const ViewAllUsers = () => {
        const history = useHistory()
        const onUserClicked = (index) => setCurrentUser(users[index])

        return (
            <UserList
                users={users}
                onUsersChanged={setUsers}
                fetchUsersUseCase={fetchUsersUseCase}
                onUserClicked={onUserClicked}
            />
        )
    }

    return (
    <MemoryRouter>
        <Switch>
        <Route exact path="/" component={ViewAllUsers} />
        </Switch>
    </MemoryRouter>
    );
}