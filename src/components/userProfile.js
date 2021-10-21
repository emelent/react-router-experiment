import React from 'react'

export default function UserProfile({ 
  user,
  onNameEditClick,
  onEmailEditClick,
  onDoneClick
}) {
    return (
      <div>
        <span>{user.name || "<No name>"} </span>
        <button onClick={onNameEditClick}>Edit</button> <br /> <br />
        <span>{user.email || "<No emal>"} </span>
        <button onClick={onEmailEditClick}>Edit</button> <br />
        <br/>
        <button onClick={}>Done</button>
      </div>
    );
  }
  