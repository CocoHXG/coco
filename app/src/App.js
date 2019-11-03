import React, { useState } from 'react';
import './App.css';
import {checkActivity, checkCredentials} from './controller'

function App() {
  var userIDs = undefined;
  const [inputs, setInputs] = useState({});
  const [locked, setLocked] = useState(false);
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      var customer_id = checkCredentials(inputs.cardNumber, inputs.csc)
      if (customer_id === false) {
        alert(`Validation failed!
          Wrong card number or password`);
      }
      else {
        var isValid = checkActivity(customer_id, inputs.price,  43.651070, -79.347015)
        if (!isValid) {
          var text = prompt(`Your card has a suscpicious activity ${customer_id}'
            Please enter the code sent to you via text`)
          if (text !== 213) {
            alert('Your account has been locked')
            setLocked(true)
          }
        }
        alert('Transaction complete!')
      }
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
        <input type="password" name="csc" value={inputs.csc} onChange={handleInputChange} required />
        <br />

        <label>Price: </label>
        <br />
        <input type="number" name="price" value={inputs.price} onChange={handleInputChange} required />
        <br />
        {!locked ? <button type="submit" id="button">Purchase</button> : null}
      </section>
    </form>
  );
}

export default App;
