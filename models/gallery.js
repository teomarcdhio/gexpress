var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GallerySchema = new Schema({
  name: String,
  description: String,
  originalname: String,
  path: String,
  dbname: String,
  album: String
});

module.exports = mongoose.model('Gallery', GallerySchema);
