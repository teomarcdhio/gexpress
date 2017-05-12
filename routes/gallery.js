var express = require('express');
var router = express.Router();
var GalleryMod = require('../models/gallery');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var fs = require('fs');


/* GET gallery page. */
router.route('/')
  .post( upload.single('image'), function(req, res){
    // create a new gallery
    console.log(req.file);
    var gallery = new GalleryMod();
    gallery.name = req.body.name;
    gallery.description = req.body.description;
    gallery.originalname = req.file.originalname;
    gallery.album = req.body.album;
    let path = req.file.path;
    console.log(path);
    gallery.path = path.substring('public/'.length);
    console.log(gallery.path);
    gallery.dbname = req.file.filename ;

    gallery.save(function(err){
      if(err)
      res.send(err);

      res.json({message: 'File ' + gallery.originalname + ' uploaded as ' + gallery.dbname + ' in location ' + gallery.path });
    });
  })
  .get(function(req, res){
    GalleryMod.find(function(err, galleries){
      if (err)
        res.send(err);
      res.json(galleries);
    });
  })

//router.route('/:dbname')
//.get(function(req, res){
//  GalleryMod.find({dbname: req.params}, funtion(err, gallery){
//    res.json();
//  });
//});

//Delete functions
.delete(function(req, res){

  let dbname = req.body.dbname;
  let id = req.body.id;
  let rmpath = "public/uploads/" + dbname ;
  GalleryMod.remove({dbname: dbname},function(err){
    if(err)
    res.send(err);
    res.json({message:  dbname + ' deleted.'});
    fs.unlinkSync(rmpath);
  });
});

router.route('/:pictureId')
.get(function(req, res){
  GalleryMod.findById(req.params.pictureId, function(err, gallery){
      if (err)
      res.send(err);
    res.render("gallery",{
      gallery: gallery.name,
      path: gallery.path,
      description: gallery.description
    });
  });
});

module.exports = router;
