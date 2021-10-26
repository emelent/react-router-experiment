import React, {useState} from 'react'
import {
  Switch,
  Route,
  MemoryRouter,
  useHistory,
  useLocation
} from "react-router-dom";
import { createFetchUsersUseCase, fetchUsersInteractor } from '../api/usersApi';
import InputEditor from '../components/inputEditor';

import UserList from '../components/userList'
import UserList2 from '../components/userList2';
import UserProfile from '../components/userProfile';
import { useInteractor } from '../hooks/interactor';


export default function UsersContainer() {
    // state
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()

    // const fetchUsersUseCase = createFetchUsersUseCase()
    const [fetchUsersLoading, fetchUsers] = useInteractor(fetchUsersInteractor, {
        onSuccess: setUsers
    })

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
            history.push('/edit/user')
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
    // const ViewAllUsers2 = () => {
    //     const history = useHistory()
    //     const onUserClicked = (index) => {
    //         setCurrentUser({index, data: users[index]})
    //         history.push('/view/user')
    //     }

    //     return (
    //         <UserList2
    //             users={users}
    //             onUsersChanged={setUsers}
    //             onUserClicked={onUserClicked}
    //             fetchUsersUseCase={fetchUsersUseCase}
    //         />
    //     )
    // }

    const LocationLogger = () => {
        const location = useLocation()
        console.log("locationPath =>", location.pathname)
        return null
    }

    return (
    <MemoryRouter>
        <Switch>
            <Route exact path="/" component={ViewAllUsers} />
            <Route exact path="/edit/user" component={ViewUser} />
            <Route exact path="/edit/user/email" component={EditUserEmail} />
            <Route exact path="/edit/user/name" component={EditUserName} />
        </Switch>
        <LocationLogger />
    </MemoryRouter>
    );
}