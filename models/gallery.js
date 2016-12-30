var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GallerySchema = new Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Gallery', GallerySchema);
