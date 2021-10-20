import React, {useState} from 'react'

export default function InputEditor({ initialInput, type = "text", onSaveInputClick }) {
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
  