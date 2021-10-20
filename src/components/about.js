import React from 'react'
import {
  useLocation,
} from "react-router-dom";



export default function About() {
  let location = useLocation();

  return (
    <div>
      <h2>About</h2>
      {location.state && `With some extra ${location.state.extra}`}
    </div>
  );
}


