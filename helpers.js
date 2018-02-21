/**
 * Created by ameno on 1/4/17.
 */

function getLabels(tone){
    return tone.tone_name;
}

function getScores(tone){
    return parseFloat((tone.score * 100).toFixed(2));
}

function getMaxScoreAndValue(scoresArray, namesArray){
    return {
        'score' : Math.max(...scoresArray),
        'name' : namesArray[scoresArray.indexOf(Math.max(...scoresArray))]
    }
}

function getDocumentAnalytics (toneCategory){
    let documentScores = {};
    toneCategory.map(function(item){
        documentScores[item.category_id] = {
            'names': item.tones.map(getLabels),
            'scores': item.tones.map(getScores),
        };

        documentScores[item.category_id]['max'] = getMaxScoreAndValue(documentScores[item.category_id].scores, documentScores[item.category_id].names);
    });

    return documentScores;
}

function getSentenceAnalytics (sentences){
    let sentenceScores = [];
    if(sentences) {
        sentences.map(function (item) {
            sentenceScores.push({
                'text': item.text,
                'tone': getDocumentAnalytics(item.tone_categories),
            });
        });
    }
    return sentenceScores;
}

exports.getAnalytics = (tone) => {
    return {
        'documentAnalysis': getDocumentAnalytics(tone.document_tone.tone_categories),
        'sentenceAnalysis': getSentenceAnalytics(tone.sentences_tone),
    };
};
