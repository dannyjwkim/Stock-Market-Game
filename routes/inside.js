var db = require("../models");
var request = require('request');
var quote = require("../routes/updata.js");
var bcrypt = require('bcrypt');
var request = require('request');


var salt = '$2a$10$.zvkhL71NZo804bNdFdBae';



var jwt = require('jsonwebtoken');

module.exports = function(app) {
 /*
  app.post("/api/soldRequest", function(req, res){
        var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                    var decoded = jwt.decode(tokenM);
                    db.MoneyAccount.findOne( {where : { id : decoded.data  }}).
                    then(function(money) {
                         console.log ( req.body.quantities);
                       res.send(
                        {

                          money : money.dataValues.money, 
                          info : req.body.quantities,
                          symbol : req.body.receiversyn


                        });
                      

                                            
                    });



              }
    
           });

    }); 

*/



    app.post("/api/name", function(req, res){ 
         var tokenM = req.body.token; 
       jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                      res.status(500).send("Invalid Token");
                 }else{

                    var decoded = jwt.decode(tokenM);
                    res.send({name : decode.data});


                 } 

     

    });  

  });

   app.post("/api/showOther", function(req, res){ 

    var tokenM = req.body.token; 
             jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){


                 res.status(500).send("Invalid Token");


                }else{

                     db.loginm.findAll( {where : {   }}).
                    then(function(other) {
                          





                    });
                        




                 } 


          });





  });



   app.post("/api/calculate", function(req, res){ 

             var tokenM = req.body.token; 
             jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{

                    var decoded = jwt.decode(tokenM);
                    db.MoneyAccount.findOne( {where : { id : decoded.data  }}).
                    then(function(moneyshow) {
                        
                         console.log(moneyshow.money);
                         var total = parseFloat(moneyshow.money) + parseFloat(req.body.addit );
                         console.log(total);
                         res.send({
                          remain : moneyshow.money,
                          portfolio : req.body.addit,
                          totalA : total
                         });
                        /*
                         var first = parseFloat(moneyshow.money);
                         var second =  parseFloat(req.body.addit );
                         var total = first + second; 
                         res.send(total );
                        */        









                     });  



                   






                   }
                   
                 });   







   });










    app.post("/api/updateMoneyLS", function(req, res){
        var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{

                    var decoded = jwt.decode(tokenM);
                    db.MoneyAccount.findOne( {where : { id : decoded.data  }}).
                    then(function(moneyMan) {
                           console.log(req.body.addition);
                           console.log(moneyMan.money);
                           var first = parseFloat(moneyMan.money);
                           var second = parseFloat(req.body.addition);
                           var totalpre = first + second;
                           var total = parseFloat(totalpre).toFixed( 2 );   //mark 
                           console.log(first);
                           console.log(second);
                           console.log(total);


                           
                           moneyMan.updateAttributes({
                            money :total
                           })
                           .then(function () {
                             res.send("finish")

                           });
                           


                                            
                    });



              }
    
           });

      }); 
  












     app.post("/api/soldMoneyRequest", function(req, res){
        var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                     console.log(req.body.symbol);
                     var symbol = req.body.symbol;
                     var decoded = jwt.decode(tokenM);
                      queryString = "http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A"+symbol;
                     request(queryString, function (error, response, quote, local_stockid) {
                                         if (!error && response.statusCode == 200) {
                                         var revalues =JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).l

                                         console.log(revalues);
                                         console.log(req.body.quantity);
                                        
                                         var qMan = parseFloat(req.body.quantity);
                                         var sMan = parseFloat(revalues);
                                         var totalpre = qMan * sMan;  //mark 
                                         var total = parseFloat(totalpre).toFixed( 2 ); 
                                         //console.log(qMan);
                                         //console.log(sMan );
                                         //console.log(total);
                                         res.send(

                                          {addition : total, 
                                            quantity : req.body.quantity,
                                            symbol :req.body.symbol 
                                          }); 


                                         










                                         } else {
                                         console.log("ERROR "+ response.statusCode);
                                         res.send("fail");
                                         
                                     //console.log(quote);
                                         
                                  }

                                

                           });
                     

                  




                }
    
           });

    }); 














    app.post("/api/soldRequest", function(req, res){
        var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                     console.log(req.body.symbol);
                    var decoded = jwt.decode(tokenM);
                     db.StockU.findOne({ where : {  userName :decoded.data, stockNames : req.body.symbol  
                     }}).then(function(soldrequest){

                        console.log(soldrequest.dataValues.stockNames);
                        if(soldrequest.dataValues.stockNames == req.body.symbol){
                            if(soldrequest.dataValues.Quantity >= req.body.quantity){
                               
                               res.send({
                                 quantity : req.body.quantity, 
                                 symbol : req.body.symbol
                                  
                                });

                            }else{

                               res.send("x");

                            }
                           



                        }

                       
                          



                     }); 




              }
    
           });

    }); 







   app.post("/api/requestQ", function(req, res){
        var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                    var decoded = jwt.decode(tokenM);
                    db.MoneyAccount.findOne( {where : { id : decoded.data  }}).
                    then(function(money) {
                         console.log ( req.body.quantities);
                       res.send(
                        {

                          money : money.dataValues.money, 
                          info : req.body.quantities,
                          symbol : req.body.receiversyn


                        });
                      

                                            
                    });



              }
    
           });

    }); 




   app.post("/api/requestPri", function(req, res){
        console.log(req.body.symbol);
        var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                    
                    var decoded = jwt.decode(tokenM);
                    var symbol = req.body.symbol ;

                    //console.log(symbol);
                    queryString = "http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A"+symbol;
                     request(queryString, function (error, response, quote, local_stockid) {
                                         if (!error && response.statusCode == 200) {
                                         var revalues =JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).l
                                         
                                         console.log( revalues);
                                         
                                         var qua = parseFloat(req.body.quantity);
                                         var stockMo = parseFloat(revalues); 
                                         var total = qua * stockMo;
                                         //console.log(total);
                                          
                                          var mymoney = parseFloat(req.body.money);
                                          //console.log(mymoney);

                                          var netmoneypre = mymoney -total ;
                                          var  netmoney = parseFloat(netmoneypre).toFixed( 2 );  //mark
                                          console.log(netmoney);

                                          res.send({
                                             symbol : req.body.symbol,
                                             netprice : netmoney , 
                                             reduction : total,
                                             quantity : req.body.quantity,
                                             user : decoded.data,
                                             price : revalues

                                            }); 
                                       
                                       } else {
                                     console.log("ERROR "+ response.statusCode);
                                     res.send("fail");
                                       
                                     //console.log(quote);
                                         
                                  }

                                

                           });

                 



              }
    
           });

    }); 



     app.post("/api/updataMymoney", function(req, res){
        var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{

                    var decoded = jwt.decode(tokenM);
                    db.MoneyAccount.findOne( {where : { id : decoded.data  }}).
                    then(function(moneyMan) {

                           moneyMan.updateAttributes({
                            money : req.body.netMoney
                           })
                           .then(function () {
                             res.send("finish")

                           });


                                            
                    });



              }
    
           });

    }); 
  
  




   app.post("/api/priceQ", function(req, res){


         var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                     var decoded = jwt.decode(tokenM);
                      var qarray = [] ; 
                     db.StockU.findAll({ where : {  userName :decoded.data  
                     }}).then(function(gdd){
                         for(var i = 0 ; i < gdd.length ; i++ ){
                              


                              qarray.push({
                                  symbol : gdd[i].dataValues.stockNames , 
                                  quantity : gdd[i].dataValues.Quantity


                              
                              });
                              

                              if(qarray.length == gdd.length){
                               // console.log( qarray);
                                res.send(qarray);

                              }


                        


                         } 




                     });







                }
                





          });        




   });  




    
    app.post("/api/insidepath", function(req, res){
         
       //var dataGo = [] ; 
       // quote.getQuote();
       var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                   var decoded = jwt.decode(tokenM);
                   //console.log(decoded.data);
                   db.StockU.findAll({ where : {  userName :decoded.data  } 

                  

                 
                  }).then(function(dbAuthor) {
                        var  dataGo = [] ; 
                        var number = "";   
                           for(var i = 0 ; i <dbAuthor.length ; i++ ){
                                if(i ==dbAuthor.length  -1 ){
                                  number +=  dbAuthor[i].dataValues.Quantity;
                                }
                                  else{ 
                                  number +=  dbAuthor[i].dataValues.Quantity + ",";
                                }

                           } 
                          

                         
                         var transfer = dbAuthor;
                         var arrayN = number.split(",");
                        for(var i = 0 ; i < dbAuthor.length ; i++ ){
                         
                             //console.log(arrayN);
                           db.stockGp.findOne( {where : { stockName :dbAuthor[i].dataValues.stockNames  }}).
                           then(function(stockp) {
                                
                           
                                  //console.log(number)
                                //console.log(stockp.dataValues.price);
                                //console.log(stockp.dataValues.stockName);
                                //console.log (quantity); 
                                //var value = dbAuthor[i].dataValues.Quantity;
                                var symbols = stockp.dataValues.stockName;
                                console.log("------------");
                               
                                var valuepre = parseFloat( stockp.dataValues.price) ;
                                 var  value= parseFloat(valuepre).toFixed( 2 );
                                
                                 
                                 //console.log(value);
                                 //console.log(second );
                                //console.log( dbAuthor[i].dataValues.stockNames);
                               
                               dataGo.push({
                                  symbol : symbols , 
                                  price  :  stockp.dataValues.price
                              });
                                 if(dataGo.length === dbAuthor.length  ){
                                 console.log(dataGo);
                                 res.send(dataGo);
                                 }
                              

                           }); 

                           

                        } 
                       





                   //console.log(dbAuthor);
                  });







                }  

          });


    });

    app.post("/api/buystock", function(req, res){
         var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{

                   var decoded = jwt.decode(tokenM);
                   console.log(decoded.data);
                   console.log(req.body.quantity);
                   var quan = parseInt(req.body.quantity );
                   console.log(req.body.symbol);
                

                  
                   db.stockGp.findOne({where :{  stockName: req.body.symbol }}).then(function (stockJ) { 

                        stockJ.updateAttributes({
                        price : req.body.price 
                         }).then(function () { });
                      

                   }).catch(function (err) {
                      db.stockGp.create({stockName: req.body.symbol , price : req.body.price });
  
                   });



                   db.StockU.findOne({where :{userName :decoded.data ,  stockNames: req.body.symbol }}).then(function (user) {
                       if (!user) {
                       db.StockU.create({ userName: decoded.data, Quantity : quan ,  stockNames: req.body.symbol });
                       }
                       else{


                       var addition = parseInt(user.Quantity) + parseInt(req.body.quantity); //mark
                       console.log(addition);
                           user.updateAttributes({
                            Quantity : addition 
                           })
                           .then(function () {

                           });

                      
                       }

                   });





                  
                   res.send("success");


                }
         });

    });



   app.post("/api/soldStock", function(req, res){

       var tokenM = req.body.token; 
         jwt.verify(tokenM, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{

                   var decoded = jwt.decode(tokenM);
                   //console.log(decoded.data);
                   //console.log(req.body.quantity);
                   var quan = parseInt(req.body.quantity );
                   //console.log(req.body.symbol);
                

                   db.StockU.findOne({where :{userName :decoded.data ,  stockNames: req.body.symbol }}).then(function (user) {
                      
                         console.log("this is " +user.Quantity);
                         console.log(req.body.quantity);
                         var subtractionpre = parseInt(user.Quantity) - parseInt(req.body.quantity);
                         
                         if( subtractionpre > 0 ){
                            user.updateAttributes({
                                Quantity : subtractionpre
                               })
                               .then(function () {
                                 res.send("finish");
                               });

                         }else if (subtractionpre < 0 ){

                                 res.send("you did not have a enough quantitiy");



                         }else{

                                user.destroy().then(function () {
                                  res.send("empty");

                               });


                         }



                       /*
                       var subtraction = parseInt(user.Quantity) - parseInt(req.body.quantity);
                       var subtraction= parseFloat(valuepre).toFixed( 2 ) //mark
                        
                       console.log(subtraction);
                            if(subtraction < 0 ){
                              res.send("You don't have enough quantity");
                            }else if(subtraction ==0 ){ 
                               
                                user.destroy().then(function () {

                               });





                            }else{


                               user.updateAttributes({
                                Quantity : subtraction 
                               })
                               .then(function () {

                               });
                            }
                      
                        */

                   }).catch(function (err) {
                      res.send("you did not purchase this stock");
  
                   });





                  
                   


                }
         });

    });



    /*
    app.post("/api/callStock", function(req, res){
       var tokenU = req.body.token; 
       jwt.verify(tokenU, process.env.SECRET_key, function(err, decode){
                if(err){
                   res.status(500).send("Invalid Token");


                }else{
                   var decoded = jwt.decode(tokenU);
                   console.log( decoded.data);
                   db.StockU.findAll( { where :{
                   id : decoded.data
                   }}).then(function(user) {

                   }); 
                   

                   res.send("sucess");


                }
        });






    });  
    */


};