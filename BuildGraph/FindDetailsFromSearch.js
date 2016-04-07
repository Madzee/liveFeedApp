
(
    function(f_Find_Place){
    var m_const_values = require('./DbNodesAndRelationShipDetails/queryStringFile.js');
    var googleapi = require('googleapis');
    var m_Http_Conn = require('./RestAdapter.js');
    var m_cheerio = require('./WebCrawling/Crawl.js');

    var search = googleapi.customsearch('v1');
    function launchGoogleSearch(client, query, callback)
    {
        var req = client.cse.list(
            { 
                cx : m_const_values.s_CX,
                q : query,
                auth : m_const_values.s_USER_API_KEY
            }, function (err, response) {
                if(err)
                {
                    console.log("Something happened ", err)
                    callback(err, null);
                }
                else
                {
                    console.log(response);
                    callback(null, response);
                }
                
            });          
           
    }

    f_Find_Place.f_Find_Place_Graph_json = function(callback)
        {          
            // Call Google Custom Search API
            launchGoogleSearch(search, m_const_values.s_SEARCH_QUERY, function (err, result) {
            if(err){
                console.log('An error occured', err);
                callback(err, null);
            }                
            console.log('Got response', result);
            
            // Fetch the list of web sites returned
            var listOfLinks = [];
            for(var index = 0; index < result.items.length; index++)
            {
                listOfLinks.push(result.items[index].link);
            }
            
            // Call Web Crawling Method            
            m_Http_Conn.f_Get_WebSite(listOfLinks[0], function (err, result) {
                if(err)
                {
                    console.log("An error occured", err);
                    callback(err, null);
                }
                
                m_cheerio.Crawl_WebSite(result, function (err, response) {
                    if(err)
                    {
                        console.log("An error occured", err);
                        callback(err, null);
                    }
                    
                    console.log("The json file got created successfully")
                    callback(null, "Success");
                })
                
            })
            
            })
        }        
       
})(module.exports);

// Initialize search API
