var bigml = require('bigml');
var fs = require("fs");
// var mongodb = require("./MongoDB/mongoDB");

var connection = new bigml.BigML('bigdataice','4ee36826e13d54665668818ac212cc518bce246a')

var source = new bigml.Source(connection);

const BigML = {
  createModel: async function (mongodb) {
    await mongodb.export2csv();
    await sleep(250);
      source.create('msgDetails.csv', function(error, sourceInfo) {
          if (!error && sourceInfo) {
              const dataset = new bigml.Dataset(connection);
              dataset.create(sourceInfo, function(error, datasetInfo) {
                  if (!error && datasetInfo) {
                      var model = new bigml.Model(connection);
                      model.create(datasetInfo, function (error, modelInfo) {
                        if (!error && modelInfo) {
  
                          fs.writeFile("model.txt",modelInfo.object.resource,(err)=>{
                            if(err) return console.log(err);
                            console.log("Model created!");
                          })
                        }
                      });
                  }
              });
          }else{
            console.log('error')
            console.log(error);
          }
      })

    return "Model created!";
  },
  predict: async function (toPredict,mongodb) {
    var prediction = new bigml.Prediction(connection);

    fs.readFile('model.txt', 'utf8', function(err, data){
      prediction.create(data, toPredict ,function(error, prediction) { 
        console.log(prediction)
        var result = prediction.object.output + "";
        fs.writeFile('predict.txt', result, (err) => {
              if(err) return console.log(err);
              console.log(result); //Output of prediction
        });
      });
    });
    console.log('bye')
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms);
  });
}

module.exports = BigML