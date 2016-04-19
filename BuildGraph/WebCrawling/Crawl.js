(
    function(f_Web_Crawl){
        
        var cheerio = require('cheerio');
        var logg = require('winston');
        
        f_Web_Crawl.Crawl_WebSite = function(result, callback)
        {
              var $ = cheerio.load(result);
              // Wiki links for districts in individual state.
              var listOfDistricts = [];
              // Get the list of websites for each district
              // site : view-source:https://en.wikipedia.org/wiki/List_of_districts_in_India
               $('table.wikitable').each(function(i, element){
                var table = $(this);
                table.children().each(function(i, element){
                    var tableRow = $(this);                    
                    tableRow.children().each(function(i, element) {                        
                        var c =$(this);                        
                        c.children().each(function (i, element) {                            
                           var bContainsClass =  $(this).attr('class') === 'mw-redirect';  
                            if(bContainsClass)
                            {
                                var url = $(this).attr('href');
                                listOfDistricts.push('https://en.wikipedia.org'+url);
                                 logg.info(url);
                            }                           
                        });                        
                    });
                });               
                return false;
                });
              
               // Wiki links for list of states               
               var listOfStates = new Array();              
               for (dis in listOfDistricts)
               {
                   listOfStates.push('https://en.wikipedia.org/wiki/' + listOfDistricts[dis].toString().split("Districts_of_")[1]);                   
               }               
                logg.info(listOfStates);
        }
 })(module.exports);