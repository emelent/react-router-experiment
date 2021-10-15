import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  MemoryRouter,
  useHistory,
  useLocation
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/profile">
            <ProfileContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  let history = useHistory();
  const onClick = () => {
    history.push("/about", { extra: "Cheese" });
  };
  return (
    <div>
      <h2>Home</h2>
      <button onClick={onClick}>About with extra stuff</button>
    </div>
  );
}

function About() {
  let location = useLocation();

  console.log(location);
  return (
    <div>
      <h2>About</h2>
      {location.state && `With some extra ${location.state.extra}`}
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function ProfileContainer() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const NameEditor = () => {
    const history = useHistory();
    return (
      <InputEditor
        initialInput={name}
        onSaveInputClick={(input) => {
          setName(input);
          history.goBack();
        }}
      />
    );
  };

  const AgeEditor = () => {
    const history = useHistory();
    return (
      <InputEditor
        initialInput={age}
        type="number"
        onSaveInputClick={(input) => {
          setAge(input);
          history.goBack();
        }}
      />
    );
  };

  const Main = () => {
    const history = useHistory();
    return (
      <Profile
        name={name}
        onNameEditClick={() => history.push("/editName")}
        age={age}
        onAgeEditClick={() => history.push("/editAge")}
      />
    );
  };

  return (
    <MemoryRouter>
      <Switch>
        <Route path="/editName" component={NameEditor} />
        <Route path="/editAge" component={AgeEditor} />
        <Route exact path="/" component={Main} />
      </Switch>
    </MemoryRouter>
  );
}

function Profile({ name, onNameEditClick, age, onAgeEditClick }) {
  return (
    <div>
      <span>{name || "<No name>"} </span>
      <button onClick={onNameEditClick}>Edit</button> <br /> <br />
      <span>{age || 0} </span>
      <button onClick={onAgeEditClick}>Edit</button> <br />
    </div>
  );
}

function InputEditor({ initialInput, type = "text", onSaveInputClick }) {
  const [input, setInput] = useState(initialInput);

  const handleChange = (e) => setInput(e.target.value);
  const handleSaveClick = () => onSaveInputClick(input);

  return (
    <div>
      <input type={type} value={input} onChange={handleChange} />
      <br />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}
