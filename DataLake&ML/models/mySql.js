const axios = require("axios");
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'icecream'
});

// create table in mysql
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "DROP TABLE cities";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
    var sql = "CREATE TABLE cities (id INT PRIMARY KEY, city_name VARCHAR(255), city_symbol INT, toddlers INT, children INT, graduates INT, adults INT, middle_age INT, seniors INT)";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });

axios
  .all([
    axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=ef1c8e7f-9287-4b29-889d-26dbb9c9ad46&limit=1000'),
    axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=64edd0ee-3d5d-43ce-8562-c336c24dbc1f&limit=1000') 
  ])
.then(function (resultCity) {
  const cities = resultCity[0].data.result.records
  const ageCities = resultCity[1].data.result.records
  values = []
  for(var i=0; i<1000; i++)
    values.push([cities[i]._id, cities[i].שם_ישוב_לועזי.trim(), cities[i].סמל_ישוב, ageCities[i].גיל_0_5, ageCities[i].גיל_6_18, 
    ageCities[i].גיל_19_45, ageCities[i].גיל_46_55, ageCities[i].גיל_56_64, ageCities[i].גיל_65_פלוס])  
  insertData(values)
});


function insertData(res) {
  var sql = `INSERT INTO cities (id, city_name, city_symbol, toddlers, children, graduates, adults, middle_age, seniors) VALUES ?`;
  connection.query(sql, [res], function(err){
    if(err) throw err;
    connection.end();
  })
}







