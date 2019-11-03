import axios from 'axios';


export function checkCredentials(cardNumber, password) {
    // TODO query for existing 
    axios.get('http://localhost:8000/cardNumber?card_num=' + cardNumber)
        .then(function (response) {
            // handle success
            alert(response.data);
            if (response.data["sec_num"] === password) {
                return response["customer_id"]
            } 
            return false;
        })
        .catch(function (error) {
            // handle error
            alert(error.status)
            console.log(error);
        })
}
 

export function checkActivity(customer_id, cost, lat, long) {
    axios.get(`http://localhost:8000/activity?customer_id=${customer_id}&cost=${cost}&lat=${lat}&long=${long}`)
        .then(function (response) {
            // handle success
            console.log(response);
            return response.data["message"] === "Good activity!";
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}