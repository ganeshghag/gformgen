exports.choicetemplate = {
  "requests": [
    {
      "createItem": {
        "item": {
          "questionItem": {
            "question": {
              "required": true,
              "choiceQuestion": {
                "type": "RADIO",
                "options": [
                  {
                    "value": "${OPTION1}"
                  },
                  {
                    "value": "${OPTION2}"
                  },
                  {
                    "value": "${OPTION3}"
                  },
                  {
                    "value": "${OPTION4}"
                  }
                ]
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

