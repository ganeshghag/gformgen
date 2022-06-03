const fetch = require('node-fetch');
const ctempl = require("./choicetemplate");
console.log(JSON.stringify(ctempl.choicetemplate));
const mylinereader = require("./sync-readfile.js");

//https://developers.google.com/oauthplayground/?code=4/0AX4XfWhoZ7PnwCiX6IGG8XF3zKnhG-DhejXerJYKtX-xlQZbz1wjQYl_w2d7X2gJ33rrGQ&scope=email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/forms openid https://www.googleapis.com/auth/userinfo.email&authuser=0&prompt=consent
//https://www.googleapis.com/auth/forms, https://www.googleapis.com/auth/drive
//node genform.js 1oGijXpQXxPVMOGtqLm5BhGFJHRccqcwLY0A4ah3WQKE icse_grade8_geography_chapter1.choice.data
async function dorun(){

	//process.argv[2], process.argv[3], etc
      var contentdata = await mylinereader.mylinereader();
	//console.log(contentdata);
	//contentdata.forEach(async function(row) {
	for(i = 0 ; i < contentdata.length ; i++){
		var row = contentdata[i];
    		console.log(row);
		await postchoiceQ(0,ctempl.choicetemplate,row[0],row[1],row[2],row[3],row[4],row[5]);
	};
	//await postchoiceQ(0,ctempl.choicetemplate,"what is capital of india","mumbai","new delhi","gangtok","all","new delhi");
}
dorun();

//post url https://forms.googleapis.com/v1/forms/1vKdMZ0C1CAT8w8aTBiJWaoXh6fjs-CUK4P60VV-8pKc:batchUpdate
async function postchoiceQ(qindex, template, question, option1, option2, option3, option4, answer){
	const UPDATE_GFORM_URL1='https://forms.googleapis.com/v1/forms/1vKdMZ0C1CAT8w8aTBiJWaoXh6fjs-CUK4P60VV-8pKc:batchUpdate';
	const UPDATE_GFORM_URL='https://forms.googleapis.com/v1/forms/'+process.argv[2]+':batchUpdate';

	var MYTOKEN=process.env.MYTOKEN;
	//console.log(MYTOKEN);

	try {
		const questionjson = genChoiceQ(qindex,template,
					question,
					option1, option2, option3, option4, answer)
		

		const response = await 	fetch(UPDATE_GFORM_URL, {
			method: 'post',
			body:    JSON.stringify(questionjson),
			headers: { 'Content-Type': 'application/json'},
			headers: { 'Authorization': 'Bearer '+MYTOKEN},
                  
		})	

		//console.log('>>>>>>>> GOT RESPONSE:'+JSON.stringify(response));
		console.log('>>>>>>>>  RESPONSE status:'+response.status);
		//console.log('>>>>>>>>  RESPONSE body:'+JSON.stringify(response.json()));

	} catch (error) {
		console.log(error);
	}

}	
			  


			  
function genChoiceQ(qindex, template, question, option1, option2, option3, option4, answer) { 
	var templateStr = JSON.stringify(template, null, 2)
	//console.log('from inside genChoiceQ\r\n' + templateStr);
	templateStr = templateStr.replace("${QINDEX}", qindex);
	templateStr = templateStr.replace("${QUESTION}", question);
	templateStr = templateStr.replace("${OPTION1}", option1);
	templateStr = templateStr.replace("${OPTION2}", option2);
	templateStr = templateStr.replace("${OPTION3}", option3);
	templateStr = templateStr.replace("${OPTION4}", option4);
	templateStr = templateStr.replace("${ANSWER}", answer);
	
	//console.log("\r\n");
	//console.log(templateStr)
	return JSON.parse(templateStr)
}




function sampleout(ptemplate) { 
	var templateStr = JSON.stringify(ptemplate)
	//console.log('from inside sampleout' + templateStr);
	JSON.parse(templateStr)
	console.log(templateStr)
}

