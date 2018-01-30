var https = require('https');
var express = require('express');
var router = express.Router(); 
a = {};

router.get('/', function(req, res, next) {
    // * HOW TO Make an HTTP Call - POST

// do a POST request
// create the JSON object
jsonObject = JSON.stringify({
    username: 'Furby',
    password: '123456'
})

// prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};

// the post options
var optionspost = {
    host : '3.8.86.49',
    port : 8834,
    path : '/session',
    method : 'POST',
    rejectUnauthorized: false,
    headers : postheaders
};

var nessusResponse = {
    message:null
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');


// do the POST call
var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);

    res.on('data', function(d) {
        //a = "tu mama es hombre";
        console.info('POST result:\n');
        process.stdout.write(d);
        console.log(d);
        a = d;
        nessusResponse.message = process.stdout.write(d);
        console.info('\n\nPOST completed');
        
    });
});

// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
     console.error(e);
});
res.send("Autentication Terminada");

  });

module.exports = router;
