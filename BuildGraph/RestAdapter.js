(
    
    function (f_Http_Connection) {    
    
    var logger = require('winston');    
    var m_request = require('request');
    var s_host = 'localhost';
    var i_port = '7474';
    var s_http_Url_For_Transaction = 'http://' + s_host + ':' + i_port + '/db/data/transaction/commit';
        
        // Executes the Neo4j query
        f_Http_Connection.f_run_Query_Command = function(query, node, f_call_back) {
        logger.info(query);
            m_request({
                uri : s_http_Url_For_Transaction,            
                method : 'POST',
                headers : 
                {
                    'Content-Type': 'application/json',
                    'Custom-Header': 'charset=UTF-8',
                    'Authorization' : 'Basic bmVvNGo6dGVzdA=='
                },
                json : { statements: [{ statement : query, parameters : node }] }
            
            },
        function (err, res, body) {
                if (err)
                    logger.info(err);
                else
                    logger.info(body);
                f_call_back(err, body);
           
            })
        }
        
        // Returns the website content
        f_Http_Connection.f_Get_WebSite = function(uri, f_call_back) {
        logger.info(uri);
            m_request({
                uri : uri,            
                method : 'GET'
            },
        function (err, res, body) {
                if (err)
                    logger.info(err);
                else if(res.statusCode == '200')                    
                f_call_back(null, body);
           
            })
        }
    
})(module.exports);


