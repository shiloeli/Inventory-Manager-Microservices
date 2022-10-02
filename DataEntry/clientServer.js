// const net = require("net");

// var socket = new net.Socket();
// socket.connect(3025, "localhost", function () {
//     console.log("Client: Connected to server");
// });

// socket.on("connection",  function (data) {
//     data = JSON.parse(data);
//     console.log("Response from server: %s", data.response);
//     // Respond back
//     socket.write(JSON.stringify({ response: "Hey there server!" }));
//     // Close the connection
//     socket.end();
// });