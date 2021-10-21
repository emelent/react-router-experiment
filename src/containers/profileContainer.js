import React, {useState} from 'react'
import {
  Switch,
  Route,
  MemoryRouter,
  useHistory,
} from "react-router-dom";

import InputEditor from '../components/inputEditor'
import Profile from '../components/profile'


export default function ProfileContainer() {
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