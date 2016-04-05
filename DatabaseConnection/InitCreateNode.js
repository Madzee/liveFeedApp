
(
    function (f_init_Create_Node) {
    var m_db_Connection = require('./DbConnection');
    var i_total_No_Of_Nodes = 0;
    var logger = require('winston');
    var j_node_Json_File = require('./DbNodesAndRelationShipDetails/NodeDetails.json');

    var s_queries = require('./DbNodesAndRelationShipDetails/queryStringFile.js');    
    
        f_init_Create_Node.init = function (app, logger) {
            
            app.get('/loadDatabase/', function (req, res) {
                
                logger.info("Got the request to call the create funtion");
                
                //check if nodes are already created
                
                f_check_If_Node_Got_Created(function (err, result) {
                    if (err) {
                        logger.info("Something went wrong with the query " + err);
                        res.send(err);
                    }
                    else
                        if (result == 0) // This api will return 0 if there are no nodes created.
                        {
                        f_create_Fully_Loaded_Database(function (err, result) {
                            logger.info('total number of nodes created ' + result);
                                if (err) // do not check for totalNoOfNodes in case of error. No point
                                    logger.info(err);
                                else if (result == 1) {
                                    logger.info("All the nodes are created ");
                                f_Build_RelationShip_Between_Nodes(function (err, result) {
                                    if (err)
                                        logger.info("The relationship was not built properly " + err);
                                    else
                                        logger.info("The relationship was built completely");
                                    });
                                }
                            });
                        }
                })
                res.send('Create Database Started');
            });
};
        
    /*
     * Function that will check if the nodes are already created
     */

    function f_check_If_Node_Got_Created(f_call_back) {
            var s_query = s_queries.s_total_Node_Count_Query;
            m_db_Connection.f_run_Query_Command(s_query, null, function (err, result) {
                if (err) {
                    logger.info("unable to find the count " + err);
                    f_call_back("Unable to find the count ", null);
                }
                else {
                    var i_no_Of_Nodes = result.results[0].data[0].row[0];
                    f_call_back(null, i_no_Of_Nodes);
                }
            });
        }
        
    /*
     *  Function that will build the complete Graph Database
     *  based on the json file that gets generated.
     */

    function f_create_Fully_Loaded_Database(next) {
            
        /*
         * Fetch the total number of nodes from the json file
         * and create the nodes.
         */               
            for (var index1 = 0; index1 < j_node_Json_File.Nodes.Country_Node.length; index1++) {
                i_total_No_Of_Nodes++;
                var country = j_node_Json_File.Nodes.Country_Node[index1];
            f_execute_Query_String(country, function (err, result) {
                    next(err, result);
                });
                
                for (var index2 = 0; index2 < country.State_Node.length; index2++) {
                    i_total_No_Of_Nodes++;
                    var state = country.State_Node[index2];
                f_execute_Query_String(state, function (err, result) {
                        next(err, result);
                    });
                    
                    for (var index3 = 0; index3 < state.District_Node.length; index3++) {
                        i_total_No_Of_Nodes++;
                        var district = state.District_Node[index3];
                        f_execute_Query_String(district, function (err, result) {
                            next(err, result);
                        });
                    }
                }
            }
        }
        
    /*
     * Build the Relationship between the nodes
     */

    function f_Build_RelationShip_Between_Nodes(f_call_back) {
        
        for (var index1 = 0; index1 < j_node_Json_File.Nodes.Country_Node.length; index1++) {            
          var j_country = j_node_Json_File.Nodes.Country_Node[index1];
            for (var index2 = 0; index2 < j_country.State_Node.length; index2++) {
                var j_state = j_country.State_Node[index2];
                f_build_Match_Query_String(j_country, j_state, function (query) {
                    m_db_Connection.f_run_Query_Command(query, null, function (err, result) {
                        f_call_back(err, result);
                    })
                })
                for (var index3 = 0; index3 < j_state.District_Node.length; index3++) {
                    var j_district = j_state.District_Node[index3];
                    f_build_Match_Query_String(j_state,j_district, function (query) {
                        m_db_Connection.f_run_Query_Command(query, null, function (err, result) {
                            f_call_back(err, result);
                        })
                    });             
                }
            }
        }

        

    }
    
    function f_build_Match_Query_String(node1, node2, f_call_back) {

        var query = "Match (N1:" + node1.Label1 + ":" 
                                 + node1.Label2 + "), (N2:" 
                                 + node2.Label1 + ":" 
                                 + node2.Label2 + ") Create (N1) - [RL:HAS_LOCALE { Name : \"" 
                                 + node2.Label2 + " \" ,Level : \"" 
                                 + node2.params.Level + " \",isLastNode : \"" 
                                 + node2.params.IsLastNode + " \"}] -> N2 Return(RL)";
        f_call_back(query);

    }
        
    function f_build_Create_Query_String(nodes) {            
        
        return s_query_String = "Create (N : " + nodes.Label1 + ":" 
                                        + nodes.Label2 + "{ params })";
    }

    f_execute_Query_String = function (node, f_call_back) {
        var query = f_build_Create_Query_String(node);
                m_db_Connection.f_run_Query_Command(query, node, function (err, result) {
                    
                    if (err) {
                        logger.info(err);
                        f_call_back(err, i_total_No_Of_Nodes--);
                    }
                    else {
                        f_call_back(null, i_total_No_Of_Nodes--);
                        logger.info(result);
                    }
                });
            }
        
    
    }    
)(module.exports);