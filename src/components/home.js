import React from 'react'
import {
  useHistory,
} from "react-router-dom";


export default function Home() {
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