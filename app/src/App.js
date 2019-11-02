import React, { useState } from 'react';
import request from 'request';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import {FraudDetection} from './fraudDetection'

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
      <div>
        <label>User ID</label>
        <input type="text" name="userID" value={inputs.userID} onChange={handleInputChange} required />
        <label>Purchase</label>
        <input type="number" name="purchase" value={inputs.purchase} onChange={handleInputChange} required />
      </div>
      <button type="submit" >Verify</button>
    </form>
  );
}

export default App;
