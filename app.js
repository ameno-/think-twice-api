/**
 * Created by ameno on 1/3/17.
 */

var express = require('express');
var watson = require('watson-developer-cloud');
var app = express();

var tone_analyzer = watson.tone_analyzer({
    username: '9f75e773-a7e2-483e-bc8f-215d087e0341',
    password: 'daoPt5BnLZn0',
    version: 'v3',
    version_date: '2016-05-19'
});

app.get('/', function (req, res) {

    tone_analyzer.tone({ text: 'A word is dead when it is said, some say. Emily Dickinson' },
        function(err, tone) {
            if (err){
                console.log(err);
                res.send(err);
            } else {
                console.log(JSON.stringify(tone, null, 2));
                res.send(JSON.stringify(tone, null, 2));
            }
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});