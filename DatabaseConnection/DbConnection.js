(
    
    function (f_Db_Connection) {    
    
    var logger = require('winston');    
    var m_request = require('request');
    var s_host = 'localhost';
    var i_port = '7474';
    var s_http_Url_For_Transaction = 'http://' + s_host + ':' + i_port + '/db/data/transaction/commit';
        
        
        f_Db_Connection.f_run_Query_Command = function(query, node, f_call_back) {
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
    
})(module.exports);


