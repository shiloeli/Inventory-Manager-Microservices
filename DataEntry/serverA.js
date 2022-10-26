const express = require('express');
const app = express();
var server = require('http').createServer(app);
const kafka = require("./models/produceKafka");
var message = require("./models/simulator");
const io = require("socket.io")(server, {
    hju: true // false by default
});

const port = 3026

// setInterval(function () {
    console.log('send')
    Promise.all([message()]).then((m) =>
    {
     console.log(m) 
        // kafka.publish(m)
    })



server.listen(port, () => console.log(`Call Generator app listening at http://localhost:${port}`));
