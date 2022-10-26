const mongoose = require('mongoose')
var holidays = require('../holidayAPI')
var weatherAns = require('../weatherAPI')
const messageSchema = require('./Message')
const fs = require('fs'); 
const Json2csvParser = require("json2csv").Parser;
const uri ='mongodb+srv://shiloel:123789@cluster0.8mdjylp.mongodb.net/?retryWrites=true&w=majority'


const mongo = async () => {
    await mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}

const mongoDB={

insertData: async function(data){
    if (data == undefined)
        return
    // const weath=["cold","hot","cloudy"]
    await mongo().then(async (mongoose) => {
    try{
        console.log('Connect to MongoDB!')
        var city;
        for(let i=0; i<1; i++){
            // console.log(data[0]["stores"])
            city = data[0]["stores"][i]
            city["weather"] = await Promise.all([weatherAns()]).then((m) => {return m[0]})
            city["holiday"] = await Promise.all([holidays()]).then((m) => {return m[0]})
            const message = {
                symbol : city["symbol"],
                chocolate : city["chocolate"],
                vanilla : city["vanilla"],
                strawberry : city["strawberry"],
                lemon : city["lemon"],
                halvah : city["halvah"],
                weather : city["weather"],
                holiday : city["holiday"]
            }
            new messageSchema(message).save()
        }
    }finally {
        console.log('Close MongoDB!')
        // mongoose.connection.close()
    }

        });
},
    
export2csv: async function() {
    console.log('hi2')
    await mongo().then((mongoose) => {
        try{
            messageSchema.find({},{}).lean().exec((err, data) => {
                console.log(data)
                if (err) throw err;
                const csvFields = ['symbol','chocolate','vanilla','strawberry','lemon', 'halvah', 'weather','holiday']
                console.log(csvFields);
                const json2csvParser = new Json2csvParser({
                    csvFields
                });
                const csvData = json2csvParser.parse(data);
                fs.writeFile("msgDetails.csv", csvData, function(error) {
                    if (error) throw error;
                    console.log("Write to callDetails.csv successfully!");
                });
            });
    
            console.log('by')
   }finally {
    console.log('Close MongoDB!')
    // mongoose.connection.close()
}
    });
}
}

// mongoose.connect(uri);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console,'connection error: '));
// db.once('open', () => {
//     console.log("MongoDB Connected")

//     const message = {
//         holidayName: 'passover'
//     }

//     new messageSchema(message).save()
// });


// getHolidayAndWeather();

// function getDate(day) {
//     var dd = String(day.getDate()).padStart(2, '0');
//     var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = day.getFullYear();
//     day = yyyy + '-' + mm + '-' + dd;
//     return day
// }

// function getHolidayAndWeather() {
//     var today = new Date();
//     const first = getDate(today);
//     const last = getDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));

//     axios
//     .all([
//       axios.get(`https://www.hebcal.com/converter?cfg=json&start=${first}&end=${last}&g2h=1`)
//       axios.get()
//     ])
//   .then(function (result) {
//     const holiday = result[0].data.hdates
//     for(date in holiday){
//         console.log(holiday[date].events)
//     }
//     const ageCities = result[1].data.result.records
//     values = []
//     for(var i=0; i<1000; i++)
//       values.push([cities[i]._id, cities[i].שם_ישוב_לועזי.trim(), cities[i].סמל_ישוב, ageCities[i].גיל_0_5, ageCities[i].גיל_6_18, 
//       ageCities[i].גיל_19_45, ageCities[i].גיל_46_55, ageCities[i].גיל_56_64, ageCities[i].גיל_65_פלוס])  
//     // insertData(values)
//     console.log(value)
// });
// }


module.exports = mongoDB



