(
    function (f_DbConnection_init) {   
    
    var m_user_Node = require('./AccomodationNode.js'),
        m_init_Creation_Node = require('./InitCreateNode.js'),
        m_accomodation_Node = require('./AccomodationNode.js');
        m_review_Node = require('./ReviewNode.js'),
        m_restaurants_Node = require('./RestaurantsNode.js'),
        m_places_To_Vist_Node = require('./PlacesToVisitNode.js');

    f_DbConnection_init.init = function (app, logger)
        {        
        m_accomodation_Node.init(app, logger);
        m_init_Creation_Node.init(app, logger);
        m_places_To_Vist_Node.init(app, logger);
        m_restaurants_Node.init(app, logger);
        m_review_Node.init(app, logger);
        m_user_Node.init(app, logger);
    }
})(module.exports);