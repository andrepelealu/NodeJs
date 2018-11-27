var express = require ('express')
var app = express()
var bodyParser = require('body-parser')
var router = express.Router();
var port = process.env.PORT || 3000
//===== SETTING DATABASE ====
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/coba')
var user = require('./models/user')

//===== KONFIG BODY PARSER ====
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//===== MIDDLEWARE ====

//TEST Router
router.get('/',function(req,res){
  res.json({
    message: "anda ada di home"
  })
})

//===== METHOD POST ====
router.route('/user')
.post(function(req,res){
  var User = new user()
  User.nama = req.body.nama
  User.pass = req.body.pass
  User.save(function(err){
    if(err) res.send(err)
    res.json({message: "user berhasil di input"})
  })
})
.get(function(req,res){
  user.find(function(err,peserta){
    if(err) res.send(err)
    res.json(peserta)
  })
})
//===== METHOD GET ====
router.route('/user/:nama')
.get(function(req,res){
  user.find({nama:req.params.nama},function(err,peserta){
    if(err) res.send(peserta)
    res.json(peserta)
  })
})
//===== METHOD UPDATE ====
.put(function(req,res){
  user.update(
    {nama:req.params.nama},
    {nama:req.body.nama},
    function(err,peserta){
      if(err) res.send(err)
      res.json("user berhasil di update")
    })
  })
  //===== METHOD DELETE ====
  .delete(function(req,res){
    user.remove({
      nama: req.params.nama
    },function(err, user){
      if(err) res.send(err)
      res.json({message:"user berhasil dihapus"})
    })
  })


  //== PREFIX API
  app.use('/api', router)
  //app.get('/',function(req,res){
  //  res.send('haloo')
  //})
  //app.get('/user/:nama',function(req, res){
  //  res.send("namanya adalah " + req.params.nama)
  //})

  app.listen(port)
  console.log('magic happen on port' + port)
