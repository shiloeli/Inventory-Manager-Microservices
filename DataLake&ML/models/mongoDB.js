const mongoose = require('mongoose')
const axios = require("axios");

const uri ='mongodb+srv://shiloel:123789@cluster0.ngt7qyg.mongodb.net/companyDB?retryWrites=true&w=majority'

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error: '));
db.once('open', () => {
    console.log("MongoDB Connected")
});

module.exports = db;

getHolidayAndWeather();

function getDate(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = day.getFullYear();
    day = yyyy + '-' + mm + '-' + dd;
    return day
}

function getHolidayAndWeather() {
    var today = new Date();
    const first = getDate(today);
    const last = getDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));
    console.log(first)
    console.log(last)

    axios
    .all([
      axios.get(`https://www.hebcal.com/converter?cfg=json&start=${first}&end=${last}&g2h=1`)
    ])
  .then(function (result) {
    const holiday = result[0].data.hdates
    for(date in holiday){
        console.log(holiday[date].events)
    }
    // console.log(holiday)
    // const ageCities = resultCity[1].data.result.records
    // values = []
    // for(var i=0; i<1000; i++)
    //   values.push([cities[i]._id, cities[i].שם_ישוב_לועזי.trim(), cities[i].סמל_ישוב, ageCities[i].גיל_0_5, ageCities[i].גיל_6_18, 
    //   ageCities[i].גיל_19_45, ageCities[i].גיל_46_55, ageCities[i].גיל_56_64, ageCities[i].גיל_65_פלוס])  
    // insertData(values)
});
}


module.exports = db
