import React, { useState } from 'react';
import './App.css';


function App() {
  var userIDs = undefined;
  const [inputs, setInputs] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      alert(`User Created!
         Name: ${inputs.userID} ${inputs.purchase}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="information">
        <label>User ID: </label>
        <input type="text" name="cardNumber" value={inputs.cardNumber} onChange={handleInputChange} required />
        <br />
        <label>Price : </label>
        <input type="number" name="purchase" value={inputs.purchase} onChange={handleInputChange} required />
      </div>
      <button type="submit">Purchase</button>
    </form>
  );
}

export default App;
