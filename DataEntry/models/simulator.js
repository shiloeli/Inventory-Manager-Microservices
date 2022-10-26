const { get } = require("jquery");
const Message = require("../../DataLake&ML/models/mongoDB/Message");
var randomName = require('random-name')
const axios = require("axios").default;

async function getData(){
  let citySales = {};
  await axios
  .all([
    axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=ef1c8e7f-9287-4b29-889d-26dbb9c9ad46&limit=1000'),
    axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=64edd0ee-3d5d-43ce-8562-c336c24dbc1f&limit=1000') 
  ])
.then(async function (resultCity) {
    const cities = resultCity[0].data.result.records
    // const index = Math.floor(Math.random()*cities.length)
    let stores = [];
    citySales.stores = stores;
    for (let index = 0; index < 100; index++) {
      let name = cities[index].שם_ישוב_לועזי.trim()
      let symbol =cities[index].סמל_ישוב
      let owner = randomName.first()
      let chocolate = Math.floor(Math.random()*50)
      let vanilla = Math.floor(Math.random()*50)
      let strawberry = Math.floor(Math.random()*50)
      let lemon = Math.floor(Math.random()*50)
      let halvah = Math.floor(Math.random()*50)
      let store = {
        symbol,
        name,
        owner,
        chocolate,
        vanilla,
        strawberry,
        lemon,
        halvah
      }
      await citySales.stores.push(store)
    }
    console.log(citySales)
})
return citySales
}


module.exports = getData;
