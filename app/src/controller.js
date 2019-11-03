import axios from 'axios';


export async function checkCredentials(cardNumber, password) {
    // TODO query for existing 
    var response = await axios.get('http://localhost:8000/cardNumber?card_num=' + cardNumber)
    if (response.data["sec_num"] === password) {
        return response["customer_id"]
    } 
    return false;
}
 

export async function checkActivity(customer_id, cost, lat, long) {
    var response = await axios.get(`http://localhost:8000/activity?customer_id=${customer_id}&cost=${cost}&lat=${lat}&long=${long}`)
    if (response.data == 200) {
        console.log(response);
        return response.data["message"] === "Good activity!";
    }
    return false
}