const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema( {
   symbol : String,
   chocolate : Number,
   vanilla : Number,
   strawberry : Number,
   lemon : Number,
   halvah : Number,
   weather : String,
   holiday : String
});


module.exports = mongoose.model('Message' , messageSchema);