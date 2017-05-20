
var db = require("../models");

var bcrypt = require('bcrypt');

var salt = '$2a$10$.zvkhL71NZo804bNdFdBae';


var jwt = require('jsonwebtoken');

module.exports = function(app) {

  
  app.post("/api/login", function(req, res){
     console.log(req.body.password);

    bcrypt.hash(req.body.password, salt, function(err, hash) {

      db.loginm.create({

        id: req.body.id,

        username: req.body.username,

        password: hash

      }).then(function(dbPost) {
           console.log("success");
             db.MoneyAccount.create({

              id: req.body.id,
              money : 10000

            

             }).then(function(good){




           });





           res.send('good');





      }).catch(function (err) {

          res.status(500).send(err);

      })

    });




  });  



   app.post("/api/compare", function(req, res) {
      var name = req.body.id;
      console.log(name); 
      db.loginm.findOne( { where :{
      id : req.body.id
      }}).then(function(user) {
          console.log(user.id);
          if (!user) {
            console.log('no user found')
            res.status(400).json({
              'status' : 'Invalid username or password'
            })
          } else {
                 console.log(user.password);
                 
                 bcrypt.compare(req.body.password, user.password, function(err, valid) {
                   if (err || !valid) {
                    res.status(400).json({
                        'status' : 'Invalid username or password'
                    })


                  }else{
                     var userToken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user.id
                      }, process.env.SECRET_key);
                      res.status(200).json({
                        id: user.id,
                        username: user.username,
                        token: userToken
                      });




                  }

                });  

            //console.log(bcrypt.hashSync(user.password));
            /* 
            bcrypt.compare(req.body.password, user.password, function(err, valid) {
              if (err || !valid) {
                
                res.status(400).json({
                  'status' : 'Invalid username or password'
                })
              } else {
                
                var userToken = jwt.sign({
                  exp: Math.floor(Date.now() / 1000) + (60 * 60),
                  data: user.id
                }, 'randomsecretforsigningjwt');
                res.status(200).json({
                  id: user.id,
                  username: user.username,
                  token: userToken
                });
              }
            });*/
          }

    });
  });







   
  app.post("/api/compare", function(req, res) {
      var name = req.body.id;
      console.log(name); 
      db.loginm.findOne( { where :{
      id : req.body.id
      }}).then(function(user) {
          console.log(user.id);
          if (!user) {
            console.log('no user found')
            res.status(400).json({
              'status' : 'Invalid username or password'
            })
          } else {
            console.log(user.password);
              if(user.password != req.body.password){
                res.status(400).json({
                    'status' : 'Invalid username or password'
                })


              }else{
                 var userToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user.id
                  }, process.env.SECRET_key);
                  res.status(200).json({
                    id: user.id,
                    username: user.username,
                    token: userToken
                  });




              }

            //console.log(bcrypt.hashSync(user.password));
            /* 
            bcrypt.compare(req.body.password, user.password, function(err, valid) {
              if (err || !valid) {
                
                res.status(400).json({
                  'status' : 'Invalid username or password'
                })
              } else {
                
                var userToken = jwt.sign({
                  exp: Math.floor(Date.now() / 1000) + (60 * 60),
                  data: user.id
                }, 'randomsecretforsigningjwt');
                res.status(200).json({
                  id: user.id,
                  username: user.username,
                  token: userToken
                });
              }
            });*/
          }

    });
  });
   /*
   app.post("/api/burgerC", function(req, res){
       console.log(req.body.id);
       console.log(req.body.password);
       var stocksymbol= req.body.id; 
       var stocksy2 = req.body.password;
       var stockID= "smae";

       
       
       var stocks = [] ;

       stocks[1] 

       =
       {
         STOCK_ID : stockID, 

         symbol : stocksymbol

       }; 
       
       stocks[0] 

       =
       {
         STOCK_ID : stockID, 

         symbol : stocksy2

       }; 

      

       var timer =  setInterval(function () {
        quote.getQuote(stocks);
       }, 1000*2);
      
      










   });

*/



  /* 
  app.post("/api/burgerC", function(req, res){
      bcrypt.hash(req.body.password, salt, function(err, hash) {

      // Store hash in your password DB.

      // TODO: update schema to enforce unique usernames

      db.burs.create({

        id: req.body.id,

        complete: hash

      })

        .then(function(dbPost) {
           console.log("success");
           res.send('/');

        })

        .catch(function (err) {

          res.status(500).send(err);

        })

    });






  });






/*
  {
       console.log(req.body);
     




    // findAll returns all entries for a table when used with no options
    db.burs.create({
       id : req.body.id,
      complete :req.body.password

    }).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

*/






};


