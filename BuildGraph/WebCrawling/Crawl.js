(
    function(f_Web_Crawl){
        
        var cheerio = require('cheerio');
        
        f_Web_Crawl.Crawl_WebSite = function(result, callback)
        {
              var $ = cheerio.load(result);
        }
 })(module.exports);