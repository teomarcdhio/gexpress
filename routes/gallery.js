var express = require('express');
var router = express.Router();
var GalleryMod = require('../models/gallery');


/* GET gallery page. */
router.route('/')
  .post(function(req, res){
    // create a new gallery
    var gallery = new GalleryMod();
    gallery.name = req.body.name;
    gallery.description = req.body.description;

    gallery.save(function(err){
      if(err)
      res.send(err);

      res.json({message: 'Gallery created'});
    });
  })
  .get(function(req, res){
    GalleryMod.find(function(err, galleries){
      if (err)
        res.send(err);
      res.json(galleries);
    });
  });

module.exports = router;
