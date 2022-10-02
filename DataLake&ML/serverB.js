const express = require('express');
const app = express();
var server = require('http').createServer(app)
const kafka = require('./models/consumerKafka');
const mongoose = require('mongoose')
const db = require('./models/mongoDB')
const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});

const port = 3026

var newMessage = "Waiting for new call...";

io.on("connection", (socket) => {
    kafka.consumer.on("data", (msg) => {
        const newMessage = JSON.parse(msg.value);
        console.log(newMessage)
});
});

// Connect to MongoDB
db


// io.on("connection", async (socket) => {




// });

// kafka.consumer.on("data", async (msg) => {
//     const newCall = JSON.parse(msg.value);
//     console.log("get new message")
// });


// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB from server');
    server.listen(port, () => console.log(`Server B is listening at http://localhost:${port}`));
// })
