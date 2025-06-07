import React, { useState } from "react";
import './navbar.css';
import axios from "axios";

function SearchBox() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.post('https://valiantProgrammer.github.io/chatbot/api', {
        message: input,
      });
      console.log('Server Response:', response.data);
      setResult(response.data); // ✅ Update state here
    } catch (error) {
      alert("Error in fetching data");
      console.error(error);
    }
  };

  return (
    <>
      <div className="searchEnter">
        <input
          type="text"
          placeholder="Enter some data to search information"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="entr" onClick={handleClick}>Enter</button>
      </div>
        <div>
          <h2>Category:</h2>
          <p>{result}</p>
        </div>
    </>
  );
}

export default SearchBox;
