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
         Name: ${inputs.cardNumber} ${inputs.price}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} class="information">
      <section class = "container">
        <header id="shop-name"> EC HACKS </header>
      
        <h1> Payment </h1>
        <label>Card Number : </label>
        <br />
        <input type="text" name="cardNumber" value={inputs.cardNumber} onChange={handleInputChange} required />
        <br />

        <label>Card Security Code : </label>
        <br />
        <input type="text" name="csc" value={inputs.csc} onChange={handleInputChange} required />
        <br />

        <label>Price: </label>
        <br />
        <input type="number" name="price" value={inputs.price} onChange={handleInputChange} required />
        <br />
        <button type="submit" id="button">Purchase</button>
      </section>
    </form>
  );
}

export default App;
