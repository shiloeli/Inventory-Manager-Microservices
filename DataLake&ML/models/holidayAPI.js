const axios = require("axios");

function getDate(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = day.getFullYear();
    day = yyyy + '-' + mm + '-' + dd;
    return day
}

const getHolidayAndWeather = async() => {
    var today = new Date();
    const first = getDate(today);
    const last = getDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));

    var ans;

    const result2 = await axios
    .all([
         await axios.get(`https://www.hebcal.com/converter?cfg=json&start=${first}&end=${last}&g2h=1`)
    ]).then(async function (result) {
    const holiday = await result[0].data.hdates
    for(date in holiday){
        ans = await holiday[date].events[0]
    }
    // return SON.stringify(result2, null, 2);
    });
    return ans
}
    
module.exports = getHolidayAndWeather;