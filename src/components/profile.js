import React from 'react'

export default function Profile({ name, onNameEditClick, age, onAgeEditClick }) {
    return (
      <div>
        <span>{name || "<No name>"} </span>
        <button onClick={onNameEditClick}>Edit</button> <br /> <br />
        <span>{age || 0} </span>
        <button onClick={onAgeEditClick}>Edit</button> <br />
      </div>
    );
  }
  