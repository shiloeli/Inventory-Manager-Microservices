const express = require('express');
const app = express();
var server = require('http').createServer(app);
const kafka = require("./models/produceKafka");
const message = require("./models/simulator");
const io = require("socket.io")(server, {
    hju: true // false by default
});

const port = 3025

// --- Socket.io - Produce call details to kafka ----------------
io.on("connection", (socket) => {
    console.log(`new user connected ${socket.id}`);
    socket.on("totalWaitingMassage", (msg) => { kafka.publish(message)});
});

app.get('/', function(req, res) {
    console.log("new user connected 2");
    // kafka.publish(message)
});

server.listen(port, () => console.log(`Call Generator app listening at http://localhost:${port}`));
