// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const translate = require('@vitalets/google-translate-api');

// routes will go here
app.get('/', function(req, res){ 
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.urlencoded());

app.post('/translate', function(req, res) {

    var text = req.body.text;
    var from = req.body.from;
    var to = req.body.to;

    translate(text, {from: from, to: to}).then(result => {
        res.send({ text: result.text });
    }).catch(err => {
        res.status(500).send({err});
    });
  });




// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);