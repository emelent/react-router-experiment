import React, {useState} from 'react'
import {
  Switch,
  Route,
  MemoryRouter,
  useHistory
} from "react-router-dom";
import { createFetchUsersUseCase } from '../api/usersApi';
import InputEditor from '../components/inputEditor';

import UserList from '../components/userList'
import UserProfile from '../components/userProfile';
import { useInteractor } from '../hooks/interactor';


export default function UsersContainer() {
    // state
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()

    const [fetchUsersLoading, fetchUsers] = useInteractor(createFetchUsersUseCase(), setUsers)

    // views

    // user view
    const ViewUser = () => {
        const history = useHistory()
        const onNameEditClick = () => {history.push('/edit/user/name')}
        const onEmailEditClick = () => {history.push('/edit/user/email')}
        const onDone = () => {
            // save locally
            const updatedUsers = [...users]
            updatedUsers[currentUser.index] = currentUser.data
            setUsers(updatedUsers)

            history.goBack()
        }
        return (
            <UserProfile
                user={currentUser.data}
                onNameEditClick={onNameEditClick}
                onEmailEditClick={onEmailEditClick}
                onDoneClick={onDone}
            />
        )
    }

    // user name edit view
    const EditUserName = () => {
        const history = useHistory()
        const onSaveInputClick = (name) => {
            setCurrentUser({...currentUser, data: {...currentUser.data, name}})
            history.goBack()
        }

        return (
            <InputEditor 
                initialInput={currentUser.data.name}
                onSaveInputClick={onSaveInputClick}
            />
        )
    }

    // user email edit view
    const EditUserEmail = () => {
        const history = useHistory()
        const onSaveInputClick = (email) => {
            setCurrentUser({...currentUser, data: {...currentUser.data, email}})
            history.goBack()
        }
        return (
            <InputEditor 
                initialInput={currentUser.data.email}
                onSaveInputClick={onSaveInputClick}
            />
        )
    }

    // view all users
    const ViewAllUsers = () => {
        const history = useHistory()
        const onUserClicked = (index) => {
            setCurrentUser({index, data: users[index]})
            history.push('/view/user')
        }

        return (
            <UserList
                users={users}
                fetchUsers={fetchUsers}
                loading={fetchUsersLoading}
                onUserClicked={onUserClicked}
            />
        )
    }

    return (
    <MemoryRouter>
        <Switch>
            <Route exact path="/" component={ViewAllUsers} />
            <Route path="/view/user" component={ViewUser} />
            <Route path="/edit/user/email" component={EditUserEmail} />
            <Route path="/edit/user/name" component={EditUserName} />
        </Switch>
    </MemoryRouter>
    );
}