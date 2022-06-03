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

