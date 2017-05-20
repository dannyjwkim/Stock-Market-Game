var request = require('request');

// function takes a array of the stocks whock quotes are to be monitered and 
// set a process to update get the quote every x seconds
function updateStockQuotes(arg) {
    setInterval(function () {
        getQuote(arg);
    }, 60000);
}


// Ulimaely will be called with a list of all the stocks being monitored and will update with the latests quote from the api
function getQuote(stocks) {
    var arrayS =new Array();
    var j = 0; 
     console.log("hi");
    for (var i = 0; i < stocks.length; i++) {

        console.log("setting interval for " + stocks[i].symbol + "  " + stocks[i].STOCK_ID);
        		if (stocks[i].symbol == 'CA$H') {
        		//Do Nothing there is no quotes for cash
        		}
        		else {
        		var local_symbol = stocks[i].symbol,
        		var local_stockid = stocks[i].STOCK_ID;
        		
        	    queryString = "http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A"+stocks[i].symbol;



        	     request(queryString, function (error, response, quote, local_stockid) {
                       if (!error && response.statusCode == 200) {
        		        //console.log(quote);
        		          //global.finAppStockLookUp[local_stockid] = JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).l;
        		       // console.log(" latest quote " + JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).t);
                        
                         arrayS[j]= {
                         stockSymbol : JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).t ,
                         lastQuote :  JSON.parse(quote.substr(5).substr(0,quote.substr(5).length-3)).l
                          

                        };
                        console.log( arrayS[j]);

                        j++;

                        if( i ==stocks.length-1 ){

                            console.log(  arrayS);
                        }
        		
                        } else {
                    		 console.log("ERROR "+ response.statusCode);
                    		 //console.log(quote);
                             
                    	}


        		   });
        	    }
        
    }
  

    console.log( global.finAppStockLookUp);

  
}

module.exports = {
    getQuote: getQuote,
    updateStockQuotes: updateStockQuotes
}
