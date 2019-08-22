var express = require('express');
var router = express.Router();
var User = require('../model/user')
var jwt = require('jsonwebtoken')
var localStorage = require('localStorage')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{data:''});
});
/* GET home page. */
router.post('/login', function(req, res, next) {
  let data = req.body
  console.log(data);
  
  User.findOne(data).then((data)=>{
    if(data){
        let token = jwt.sign({data:data.id},req.app.get('superSecret'),{
          expiresIn: 60*60
        })
        localStorage.setItem('myKey', {token:token});
        res.redirect('/dashboard');
        
    }else{
      res.render('index',{data:'invalid login'});
    }
    
  })
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/dashboard', function(req, res, next) {
  let token = localStorage.getItem('myKey');  
  jwt.verify(token.token,req.app.get('superSecret'),(err,decoded)=>{
    console.log(decoded);
    
    res.render('dashboard',{userData:decoded})
  })
  
});

router.post('/signUp', function(req, res, next) {
  let data = req.body
  console.log(data);
  
  User.create(data).then((data)=>{
    res.render('index',{data:'Account created succcessfully'});
  })
   
});
module.exports = router;
