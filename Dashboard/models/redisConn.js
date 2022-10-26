// const redis = require('redis');
// const redisClient = redis.createClient(6379,'127.0.0.1');
// redisClient.on('error', (err) => {
//     console.log('Error occured while connecting or accessing redis server');
// });
// if(!redisClient.get('customer_name',redis.print)) {
//     //create a new record
//     redisClient.set('customer_name','John Doe', redis.print);
//     console.log('Writing Property : customer_name');
// } else {
//     let val = redisClient.get('customer_name',redis.print);
//     console.log(`Reading property : customer_name - ${val}`);
// }

const redis = require('ioredis');
const redisClient = redis.createClient({host: "127.0.0.1",port:6379,username:'',password:''});

redisClient.on('connect',() => {
    console.log('connected to redis successfully!');
})

redisClient.on('error',(error) => {
    console.log('Redis connection error :', error);
})

// if(!redisClient.get('customer_name',redis.print)) {
//     //create a new record
//     redisClient.set('customer_name','John Doe', redis.print);
//     console.log('Writing Property : customer_name');
// } else {
//     let val = redisClient.get('customer_name',redis.print);
//     console.log(`Reading property : customer_name - ${val}`);
// }

module.exports = redisClient;