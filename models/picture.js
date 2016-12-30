var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PictureSchema = new Schema({
  name: String,
  description: String,
  gallery: String
});

module.exports = mongoose.model('Picture', PictureSchema);
