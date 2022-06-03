const fetch = require('node-fetch');
const ctempl = require("./shortanstemplate");
console.log(JSON.stringify(ctempl.shortanstemplate));
const mylinereader = require("./sync-readfile-shortans.js");

//https://developers.google.com/oauthplayground/?code=4/0AX4XfWhoZ7PnwCiX6IGG8XF3zKnhG-DhejXerJYKtX-xlQZbz1wjQYl_w2d7X2gJ33rrGQ&scope=email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/forms openid https://www.googleapis.com/auth/userinfo.email&authuser=0&prompt=consent
//https://www.googleapis.com/auth/forms, https://www.googleapis.com/auth/drive
//node genformans.js 1oGijXpQXxPVMOGtqLm5BhGFJHRccqcwLY0A4ah3WQKE icse_grade8_geography_chapter1.question.data
async function dorun(){

	//process.argv[2], process.argv[3], etc
      var contentdata = await mylinereader.mylinereader();
	//console.log(contentdata);
	for(i = 0 ; i < contentdata.length ; i++){
		var row = contentdata[i];
    		console.log(row);
		await postShortQ(0,ctempl.shortanstemplate,row[0],row[1]);
	};
}
dorun();

//post url https://forms.googleapis.com/v1/forms/1vKdMZ0C1CAT8w8aTBiJWaoXh6fjs-CUK4P60VV-8pKc:batchUpdate
async function postShortQ(qindex, template, question, answer){
	const UPDATE_GFORM_URL1='https://forms.googleapis.com/v1/forms/1vKdMZ0C1CAT8w8aTBiJWaoXh6fjs-CUK4P60VV-8pKc:batchUpdate';
	const UPDATE_GFORM_URL='https://forms.googleapis.com/v1/forms/'+process.argv[2]+':batchUpdate';

	var MYTOKEN=process.env.MYTOKEN;
	//console.log(MYTOKEN);

	try {
		const questionjson = genShortQ(qindex,template,question,answer);

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
			  


function genShortQ(qindex, template, question, answer) { 
	var templateStr = JSON.stringify(template, null, 2)
	//console.log('from inside genChoiceQ\r\n' + templateStr);
	templateStr = templateStr.replace("${QINDEX}", qindex);
	templateStr = templateStr.replace("${QUESTION}", question);
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

