const express = require('express');
const app = express();
var server = require('http').createServer(app)
const kafka = require('./models/consumerKafka');
const mongo = require('./models/mongoDB/mongoDB');
var sqlConn = require('./models/mySql')
const BigML = require('./models/bigML')

const port = 3025

var newMessage = "Waiting for new call...";


kafka.consumer.on("data", (msg) => {
    const newMessage = JSON.parse(msg.value);
    console.log(newMessage)
    mongo.insertData(newMessage);
    var res = BigML.createModel(mongo);
    BigML.predict({},mongo);
});




// console.log('hi');
    // const msg  = '[{"stores":[{"symbol":966,"name":"1ABU RUBEIA","chocolate":28,"vanilla":15,"strawberry":14,"lemon":23,"halvah":17},{"symbol":966,"name":"2ABU RUBEIA","chocolate":28,"vanilla":15,"strawberry":14,"lemon":23,"halvah":17},{"symbol":966,"name":"3ABU RUBEIA","chocolate":28,"vanilla":15,"strawberry":14,"lemon":23,"halvah":17},{"symbol":966,"name":"4ABU RUBEIA","chocolate":28,"vanilla":15,"strawberry":14,"lemon":23,"halvah":17},{"symbol":966,"name":"5ABU RUBEIA","chocolate":28,"vanilla":15,"strawberry":14,"lemon":23,"halvah":17},{"symbol":966,"name":"6ABU RUBEIA","chocolate":28,"vanilla":15,"strawberry":14,"lemon":23,"halvah":17}]}]'
    // newMessage = JSON.parse(msg);
    // mongo.insertData(newMessage);
    // var res = BigML.createModel(mongo);
    // BigML.predict({_id:0},mongo);
    // mongo.export2csv()
// kafka.consumer.on("disconnected");


// io.on("connection", (socket) => {
//     kafka.consumer.on("data", (msg) => {
//         const newMessage = JSON.parse(msg.value);
//         console.log(newMessage)
// });
// });





server.listen(port, () => console.log(`Server B is listening at http://localhost:${port}`));

