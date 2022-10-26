const axios = require("axios");

async function getWeather(date, latitude, longitude, elevation){
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=32.109333&lon=34.855499&units=metric&appid=517ebcff77e5c5604d4f5ad45946264d")
      .then(async function (response) {
        data = response.data;
        for (var key of Object.keys(data)) {
            if(key==="weather"){
            const myJSON = JSON.stringify(data[key]);
            const words = myJSON.split(',');
            // console.log(words);
            // const main = words[1].split(':');
            // console.log(main[1]);
            const description = words[2].split(':');
            return description
            // const icon = words[3].split(':');
            // console.log(icon[1]);
            // icon[1] = icon[1].substring(1,4);
            // console.log(icon[1]);
            // let weather = {};
            // weather.temp = data.main.temp;
            // weather.main = main[1];
            // weather.description = description[1];
            // weather.icon = icon[1];
            // kafpro.publish(weather);
            }
        }
      })
      .catch(async function (error) {
          console.log("error from api" + error)
      })
      .then(async function () {
      });
}
module.exports = getWeather