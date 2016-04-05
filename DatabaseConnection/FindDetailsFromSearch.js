
/*var search = require('google-search');
var googleSearch = new search({
    key : 'AIzaSyBTG_JfP9JmWoJMVc2nDErK2x41gMovj3U',
    cx : '012653149359185328452:orszlzzgkum'
});

googleSearch.build({
    q: "",
    start: 5,
    fileType: "pdf",
    gl: "tr", //geolocation, 
    lr: "lang_tr",
    num: 10, // Number of search results to return between 1 and 10, inclusive 
    siteSearch: "http://wikipedia.com/" // Restricts results to URLs from a specified site 
}, function (error, response) {
    console.log(response);
});*/

var m_const_values = require('./DbNodesAndRelationShipDetails/queryStringFile.js');
var google = require('googleapis');

// Initialize search API
