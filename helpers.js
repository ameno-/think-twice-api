/**
 * Created by ameno on 1/4/17.
 */
function getLabels(tone){
    return tone.tone_name;
}

function getScores(tone){
    return (tone.score * 100).toFixed(2);
}

exports.getAnalytics = (toneCategory) => {
    let analytics = {};
    toneCategory.map(function(item){
        analytics[item.category_id] = {
            'names': item.tones.map(getLabels),
            'scores': item.tones.map(getScores),
        };
    });

    return analytics;
};