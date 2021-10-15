import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  MemoryRouter,
  useHistory,
  useLocation
} from "react-router-dom";

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
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <hr />

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

  return (
    <div>
      <h2>About</h2>
      {location.state && `With some extra ${location.state.extra}`}
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

  let history = useHistory();
  const onClick = () => {
    history.push("/about", { extra: "spice" });
  };

  return (
    <div>
      <Link to="/">A way home</Link>
      <br />
      <button onClick={onClick}>About with extra stuff</button>
      <MemoryRouter>
        <Switch>
          <Route path="/editName" component={NameEditor} />
          <Route path="/editAge" component={AgeEditor} />
          <Route exact path="/" component={Main} />
        </Switch>
      </MemoryRouter>
    </div>
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

  useEffect(() => {
    console.log(`InputEditor<${type}>::mounted`);
  }, [type]);
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
