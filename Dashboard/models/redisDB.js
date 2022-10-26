const redisClient = require('./redisConn')

var keys=[];
const redisDB = {

    //Insert data to redis db
    setDataInRedis: async function (data) {
                    let sumChocolate = 0
                    let sumVanilla = 0
                    let sumStrawberry = 0
                    let sumLemon = 0
                    let sumHalva = 0
                    keys=[]
                        for(let i=0; i<100; i++){
                            city = data[0]["stores"][i];
                            // create a new record
                                redisClient.set("name-"+city["name"],await city["symbol"]);

                                keys.push(await city["name"])

                                redisClient.set(city["symbol"]+"-chocolate",await city["chocolate"]);
                                sumChocolate+= await city["chocolate"];
                                redisClient.set(city["symbol"]+"-vanilla",await city["vanilla"]);
                                sumVanilla+= await city["vanilla"];
                                redisClient.set(city["symbol"]+"-strawberry",await city["strawberry"]);
                                sumStrawberry+= await city["strawberry"];
                                redisClient.set(city["symbol"]+"-lemon",await city["lemon"]);
                                sumLemon+= await city["lemon"];
                                redisClient.set(city["symbol"]+"-halvah",await city["halvah"]);
                                sumHalva+= await city["halvah"];
                                // console.log(`Writing Property : ${await city["symbol"]}`);
                            }
                            redisClient.set("allchocolate",sumChocolate);
                            redisClient.set("allvanilla",sumVanilla);
                            redisClient.set("allstrawberry",sumStrawberry);
                            redisClient.set("alllemon",sumLemon);
                            redisClient.set("allhalvah",sumHalva);
                            console.log('data insert to redis')
                        },

    //Init all keys
    initDB: async function() {
        redisClient.keys('*', function (err, keys) {
            if (err) return console.log(err);

            for (key in keys){
                redisClient.set(key, 0)
            }
        });
    },
    
    
    getDataToChart1: async function() {
        let data = []
        data.push(await redisClient.get("allchocolate"))
        data.push(await redisClient.get("allvanilla"))
        data.push(await redisClient.get("allstrawberry"))
        data.push(await redisClient.get("alllemon"))
        data.push(await redisClient.get("allhalvah"))
        return data;
    },

    getDataChartForCity: async function(name) {
        console.log(name)
        console.log("hi")
        let symbol = await redisClient.get(`name-${name}`)
        console.log(symbol)
        let data = []
        data.push(await redisClient.get(`${symbol}-chocolate`))
        data.push(await redisClient.get(`${symbol}-vanilla`))
        data.push(await redisClient.get(`${symbol}-strawberry`))
        data.push(await redisClient.get(`${symbol}-lemon`))
        data.push(await redisClient.get(`${symbol}-halvah`))
        console.log(data)
        return data;
    },

    getOptionToChart1: () => {
        return keys
    }
}


    // var multi = redisClient.multi()
        //create a new record
        // for(let i=0; i<100; i++){
        //     city = data[0]["stores"][i];
        //     const iceStock = [
        //         city["chocolate"],
        //         city["vanilla"],
        //         city["strawberry"],
        //         city["lemon"],
        //         city["halvah"],
        //     ]
        //     for(var j=0; j<iceStock.length; j++){
        //         multi.rpush(city["symbol"]+"-chocolate", iceStock[i])
        //     }
        //     checkCache(city["symbol"]);
        // }
        // console.log('insert to redis succeeded')


// const checkCache = async (key) => {
//     const exists = await redisClient.exists(key)
//     if(!exists) {
//         // init the key
//         return 0; 
//     }
//     const data = await redisClient.get(key);
//       console.log("NO ERROR + " + data);
//     //   if(data !== null) { return JSON.parse(data); }
//     // return null;
//   };

module.exports = redisDB