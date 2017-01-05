/**
 * Created by ameno on 1/3/17.
 */

const express = require('express');
const watson = require('watson-developer-cloud');
const helpers = require('./helpers');
const app = express();

const tone_analyzer = watson.tone_analyzer({
    username: '9f75e773-a7e2-483e-bc8f-215d087e0341',
    password: 'daoPt5BnLZn0',
    version: 'v3',
    version_date: '2016-05-19'
});

app.get('/:text', function (req, res) {
    // const sample =  "My man Inf left a Tec and a nine at my crib Turned himself in, he had to do a bid A one-to-three, he be home the end of \'93 I\'m ready to get this paper, G, you with me? Motherfucking right, my pocket\'s looking kind of tight and I'm stressed, yo Biggie let me get the vest No need for that, just grab the fucking gat, The first pocket that\'s fat the Tec is to his back. Word is bond, I\'m a smoke him yo don\'t fake no moves (what?). Treat it like boxing: stick and move, stick and move";
    tone_analyzer.tone({ text: req.params.text },
        (err, tone) => {
            if (err){
                console.log(err);
                res.send("Something went wrong! Try selecting some other text");
            } else {
                let analytics = helpers.getAnalytics(tone);
                res.json(analytics);
            }
        });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Think twice is running on yo mamas port');
});