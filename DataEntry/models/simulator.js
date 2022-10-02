// const request = require('request');

// let url = "https://raw.githubusercontent.com/GabMic/israeli-cities-and-streets-list/master/israeli_street_and_cities_names.json";

// let options = {json: true};



// request(url, options, (error, res, body) => {
//     if (error) {
//         return  console.log(error)
//     };

//     if (!error && res.statusCode == 200) {
//         // do something with JSON, using the 'body' variable
//         console.log("hi")
//         console.log(typeof body)
//         console.log(body['city_name'])
//         // for(var myKey in body['city_name']){
//         //     console.log(myKey)
//         // }
//     };
// });

const axios = require("axios");

var newMessage = axios
  .all([
    axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=ef1c8e7f-9287-4b29-889d-26dbb9c9ad46&limit=1000'),
    axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=64edd0ee-3d5d-43ce-8562-c336c24dbc1f&limit=1000') 
  ])
.then(function (resultCity) {
    const cities = resultCity[0].data.result.records
    const index = Math.floor(Math.random()*cities.length)
    const value = [cities[index]._id, cities[index].שם_ישוב_לועזי.trim(), cities[index].סמל_ישוב, Math.floor(Math.random()*50),
    Math.floor(Math.random()*50), Math.floor(Math.random()*50), Math.floor(Math.random()*50), Math.floor(Math.random()*50)]
    console.log(value)
    return value
});

module.exports = newMessage;


