import axios from 'axios';


function checkCredentials(cardNumber, password) {
    // TODO query for existing 
    axios.get('/cardNumber?card_num=' + cardNumber)
        .then(function (response) {
            // handle success
            console.log(response);
            if (response["sec_num"] == password) {
                return resp["customer_id"]
            } 
            return false;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
 

function checkActivity(customer_id, cost, lat, long) {
    axios.get(`/activity?customer_id=${customer_id}&cost=${cost}&lat=${lat}&long=${long}`)
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