/**
 * Created by ameno on 1/3/17.
 */

const express = require('express');
const watson = require('watson-developer-cloud');
const app = express();
const helpers = require('./helpers');

const tone_analyzer = watson.tone_analyzer({
    username: '9f75e773-a7e2-483e-bc8f-215d087e0341',
    password: 'daoPt5BnLZn0',
    version: 'v3',
    version_date: '2016-05-19'
});

app.get('/:text', function (req, res) {
    tone_analyzer.tone({ text: req.params.text }, (err, tone) => {
        if (err){
            console.log(err);
            res.send(err);
        } else {
            let analytics = helpers.getAnalytics(tone.document_tone.tone_categories);
            console.log(analytics);
            res.send(JSON.stringify(analytics, null, 2));
        }
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Think-twise is running on port');
});