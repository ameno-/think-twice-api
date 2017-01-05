/**
 * Created by ameno on 1/4/17.
 */
const colors = require('colors');

function getLabels(tone){
    return tone.tone_name;
}

function getScores(tone){
    return (tone.score * 100).toFixed(2);
}

function getDocumentAnalytics (toneCategory){
    let documentScores = {};
    toneCategory.map(function(item){
        documentScores[item.category_id] = {
            'names': item.tones.map(getLabels),
            'scores': item.tones.map(getScores),
        };
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
            console.log(sentenceScores[0].tone);
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