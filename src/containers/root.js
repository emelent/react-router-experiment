import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from '../components/home'
import About from '../components/about'
import NavBar from '../components/navBar'
import ProfileContainer from '../containers/profileContainer'
import UsersContainer from '../containers/usersContainer'

export default function Root() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <ProfileContainer />
          </Route>
          <Route path="/users" component={UsersContainer}/>
        </Switch>
      </div>
    </Router>
  );
}
