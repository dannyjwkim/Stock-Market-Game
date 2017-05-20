var db = require("../models");
var request = require('request');





function returnQuote(arg) {


                         console.log(arg);
                        queryString = "http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A"+arg;

                          

                           request(queryString, function (error, response, quote, local_stockid) {
                                         if (!error && response.statusCode == 200) {
                                         var revalues =JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).l
                                         
                                         console.log( revalues);
                                         // var list = JSON.parse(quote.substr(4).substr(0,quote.length-2));
                                          
                                          //console.log(list);
                                          //global.finAppStockLookUp[local_stockid] = JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).l;
                                         // console.log(" latest quote " + JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).t);
                                        
                                        
                                           return {price : revalues};


                                       
                                       } else {
                                     console.log("ERROR "+ response.statusCode);
                                         var re = "empty";
                                         return re;
                                     //console.log(quote);
                                         
                                  }

                                

                           });














  
}







function getQuote() {

  db.stockGp.findAll( { where :{
                   
                   
                   }}).then(function(stockss) {
                   //console.log(user); 
                        
                        queryString = "http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A"

                         for(let i = 0 ; i <stockss.length; i++){
                             if(i != stockss.length -1){
                             queryString += stockss[i].dataValues.stockName+",";
                             }else{
                              queryString += stockss[i].dataValues.stockName;

                             }



                           }
                          

                           request(queryString, function (error, response, quote, local_stockid) {
                                         if (!error && response.statusCode == 200) {
                                          // console.log(quote);   
                                          var list = JSON.parse(quote.substr(4).substr(0,quote.length-2));
                                          
                                          for (let i = 0 ; i < list.length ; i++){
                                            db.stockGp.findOne({where :{  stockName: list[i].t }})
                                            .then(function (stockM) {
                                                stockM.updateAttributes({
                                                   price : parseFloat(list[i].l)
                                                 })
                                                 .then(function () {
                                                 	console.log("success");

                                                 });    
                                                                  

                                            });                                    



                                          }

                                          //global.finAppStockLookUp[local_stockid] = JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).l;
                                         // console.log(" latest quote " + JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).t);
                                        
                                        
                      


                                       
                                   

                                         


                                        
                                    } else {
                                     console.log("ERROR "+ response.statusCode);
                                     //console.log(quote);
                                         
                                  }

                                

                              });










                   });
                   




  
}

module.exports={
    getQuote: getQuote,
    reQuotoe : returnQuote
    
}
