const uuid = require("uuid");
const Kafka = require("node-rdkafka");

// use you own parameters
const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "sulky-01.srvs.cloudkafka.com:9094,sulky-02.srvs.cloudkafka.com:9094,sulky-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "cmb829c5",
  "sasl.password": "f_vfZL1jxHTsWhDVcraJte7FpV4T9FAE",
  "debug": "generic,broker,security"
};

const prefix = "cmb829c5-";
const topic = `${prefix}default`;
const topic2 = `${prefix}new`;



const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

producer.on("ready", function(arg) {
  console.log(`producer ${arg.name} ready.`); 
});
producer.connect();

module.exports.publish = function(msg)
{   
  console.log('hi generate massage')
  m=JSON.stringify(msg);
  // console.log(m)  
  // producer.produce(topic, -1, genMessage(m), uuid.v4()); 
  producer.produce(topic, -1, genMessage(m), uuid.v4()); 
}