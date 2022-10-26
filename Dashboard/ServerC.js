const express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')
const kafka = require('./models/comsumeKafka');
const redis = require('./models/redisDB')
app.use(express.static('view'));
console.log("my socket server is running")

var io = socket(server);

const port = 8080

kafka.consumer.on("data", (msg) => {
    console.log('get message')
    const newMessage = JSON.parse(msg.value);
    redis.initDB()
    redis.setDataInRedis(newMessage)
});

io.on("connection", async (socket) => {
//     console.log(`new user connected ${socket.id}`);
    // const m = '[{"stores":[{"name":"tel-aviv","symbol":967,"chocolate":15,"vanilla":34,"strawberry":46,"lemon":21,"halvah":5},{"name":"afula","symbol":472,"chocolate":21,"vanilla":30,"strawberry":48,"lemon":6,"halvah":7}]}]'
//     const newMessage = JSON.parse(m);
    io.emit('data-to-chart1',await redis.getDataToChart1(),await redis.getOptionToChart1()) 
    
    io.emit('data-to-chart2',await redis.getDataChartForCity('OFAQIM')) 

    socket.on("ans-city-data",async function(data){
        io.sockets.emit("ans-city-data",await redis.getDataChartForCity(data))
    });
    });


server.listen(port, () => console.log(`Server C is listening at http://localhost:${port}`));
