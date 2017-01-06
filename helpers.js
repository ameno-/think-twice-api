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
    // figure out way to improve this. No need to call math.max twice!!
    return {
        'score' : Math.max(...scoresArray),
        'name' : namesArray[scoresArray.indexOf(Math.max(...scoresArray))]
    }
}

// var scores = sentence.tone.emotion_tone.scores;
// var names = sentence.tone.emotion_tone.names;
//
// var emotionalMaxScore = Math.max(...scores);
// var emotionalMaxScoreName = names[scores.indexOf(emotionalMaxScore)];
// var languageMaxScore = Math.max(...sentence.tone.language_tone.scores);
// var languageMaxName = Math.max(...sentence.tone.language_tone.scores);
// var socialMaxScore = Math.max(...sentence.tone.social_tone.scores);
// var socialMaxName = Math.max(...sentence.tone.social_tone.scores);

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

// Data model:
/*
{
     "documentAnalysis": {
         "emotion_tone": {
             "names": [],
             "scores": []
         },
         "language_tone": {
             "names": [],
             "scores": []
         },
         "social_tone": {
             "names": [],
             "scores": []
         }
 },
     "sentenceAnalysis": [
        {
         "text": "... sentence text ...",
         "tone": {
            "emotion_tone": {
                "names": [],
                "scores": []
             },
            "language_tone": {
                "names": [],
                "scores": []
             },
            "social_tone": {
                "names": [],
                "scores": []
            },
         }
        },
        {
         "text": "... sentence text ...",
         "tone": {
             "emotion_tone": {
                 "names": [],
                 "scores": []
             },
             "language_tone": {
                 "names": [],
                 "scores": []
             },
             "social_tone": {
                 "names": [],
                 "scores": []
             },
         }
        },
     ]
 }
*
*
*
*
* */