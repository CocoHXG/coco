import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
async function checkCredentials(cardNumber, password) {
  // TODO query for existing 
  try {
      var response = await axios.get('http://localhost:8000/cardNumber?card_num=' + cardNumber);
      console.log(response)
      if (response.data.sec_num === password) {
          return response.data.customer_id
      } 
  } catch (err) {
    console.log(err);
  }
  return false;
}

async function checkActivity(customer_id, cost, lat, long) {
  try {
      var response = await axios.get(
          `http://localhost:8000/activity?customer_id=${customer_id}&cost=${cost}&lat=${lat}&long=${long}`);
      if (response.status === 200) {
          console.log(response);
          if (response.data.message === "Good activity!") {
              console.log(response)
              return true;
          }
      }
  } catch (err) {
    console.log(err);
  }
  return false
}

function App() {
  var userIDs = undefined;
  const [inputs, setInputs] = useState({});
  const [locked, setLocked] = useState(false);
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
      var customer_id = await checkCredentials(inputs.cardNumber, inputs.csc)
      if (customer_id === false) {
        alert(`Validation failed!
          Wrong card number or password`);
      }
      else {
        var isValid = await checkActivity(customer_id, inputs.price,  43.651070, -79.347015)
        if (!isValid) {
          var text = prompt(`Your card has a suscpicious activity ${customer_id}'
            Please enter the code sent to you via text`)
          if (text !== 213) {
            alert('Incorrect code! Your account has been locked.')
            setLocked(true)
            return 
          }
        }
        alert(`Transaction complete! ${customer_id} ${isValid}`)
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
