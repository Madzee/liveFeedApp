// Create an express object
var express = require('express'),
    stylus = require('stylus'),    
    bodyparser = require('body-parser'),    
    c_Db_Instance = require('./BuildGraph/DbConnection_index.js'); // Instead of database initialization, we need to initialize everything object here. (So make the code common)

var googleapis = require('googleapis');
var logg = require('./log.js');
logg.info('Server start');



    // Set the node environmental variable to development
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    
    // This code is to use the stylus
    {
        // Create a middleware function
        
        var compile = function (str, path) {
            return stylus(str).set('filename', path);
        }
    }
    // Create the express object
var app = express();
 
    //Initialize the database connection code
    c_Db_Instance.init(app, logg);
    // Set the path where the server side views are rendered
    app.set('views' , __dirname + '/server/view');
    
    // Set the view engine
    app.set('view engine', 'jade');
    app.use(stylus.middleware(
        {
            src : __dirname + '/public',
            compile : compile

        }));
    
    // If any unknown route comes, the route will be searched in the public folder
    // and if a file matches the route it will be returned to the user.
    app.use(express.static(__dirname + '/public'));
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());    
        
    // This is the default route, if a route is not defined, we will reach this place
    // and the server redirects the caller to a different page, ideally the index page.
app.get('*', function (req, res) {
    logg.info('Rendering the index.html page for request');
        res.render('index');
//    res.send('txt');
    });
    
    var port = 3030;
    app.listen(port);
    
    console.log('listening on ' + port);

