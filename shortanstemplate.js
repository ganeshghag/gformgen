exports.shortanstemplate = {
  "requests": [
    {
      "createItem": {
        "item": {
          "questionItem": {
            "question": {
              "textQuestion": {
                "paragraph": false
              },
              "grading": {
                "correctAnswers": {
                  "answers": [
                    {
                      "value": "${ANSWER}"
                    }
                  ]
                },
                "pointValue": 1
              }
            }
          },
          "title": "${QUESTION}"
        },
        "location": {
          "index": "${QINDEX}"
        }
      }
    }
  ]
}
