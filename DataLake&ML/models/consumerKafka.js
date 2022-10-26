// https://www.cloudkarafka.com/ 
const Kafka = require("node-rdkafka");

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "qw8rmirb",
  "sasl.password": "P_yrWTln5BeT7fFiLXbddBSCDI8oayAC",
  "debug": "generic,broker,security"
};

const prefix = "qw8rmirb-";
const topic = `${prefix}default`;
const topic2 = `${prefix}new`;


const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", (err) => {
  console.error(err);
});

consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready - for MongoDB & BigML`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
//  console.log(m.value.toString());
});

consumer.on("disconnected", (arg)=> {
  process.exit();
});
consumer.on('event.error', (err)=> {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function(log) {
//   console.log(log);
});
consumer.connect();

module.exports.consumer = consumer;