import axios from 'axios';


export function checkCredentials(cardNumber, password) {
    // TODO query for existing 
    axios.get('http://localhost:8000/cardNumber?card_num=' + cardNumber,
        { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(function (response) {
            // handle success
            console.log(response);
            if (response["sec_num"] == password) {
                return response["customer_id"]
            } 
            return false;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
 

export function checkActivity(customer_id, cost, lat, long) {
    axios.get(`http://localhost:8000/activity?customer_id=${customer_id}&cost=${cost}&lat=${lat}&long=${long}`,
        { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(function (response) {
            // handle success
            console.log(response);
            return response["message"] === "Good activity!";
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}