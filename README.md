# helper API written for the [think twice chrome extension](https://github.com/ameno-/think-twice-ext).

Only one endpoint. Used to send requests to Watson API, format response data, send formatted data to UI. API lives on heroku @https://think-twise.herokuapp.com

## Data model:
```
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
 ```
