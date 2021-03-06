import React from 'react'
import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>

            <hr />
        </div>
    )
}