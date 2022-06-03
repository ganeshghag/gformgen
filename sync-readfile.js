const lineByLine = require('n-readlines');
//const liner = new lineByLine('icse_grade8_geography_chapter1.choice.data');
const liner = new lineByLine(process.argv[3]);

//doRun();

async function doRun(){
	var ret1 = await mylinereader();
	console.log(ret1);
}

module.exports.mylinereader = async function mylinereader() {
var retRows = [];
var question, option1, option2, option3, option4, answer;
var linenum = 0;
var params = [];

let line;
while (line = liner.next()) {
    //console.log('line is '+line);
	line = line.toString('ascii');
	
    var mymod = (linenum % 7);
    if( mymod === 0 ) {
		params = [];
		linenum++;
        continue;
    }
    if( mymod === 1 ) {
		question = line;
        params.push(question.replace('\r',''));
		linenum++;
        continue;
    }
    if( mymod === 2 ) {
		option1 = line;
        params.push(option1.replace('\r',''));
		linenum++;
        continue;
    }
    if( mymod === 3 ) {
		option2 = line;
        params.push(option2.replace('\r',''));
		linenum++;
        continue;
    }
    if( mymod === 4 ) {
		option3 = line;
        params.push(option3.replace('\r',''));
		linenum++;
        continue;
    }
    if( mymod === 5 ) {
		option4 = line;
        params.push(option4.replace('\r',''));
		linenum++;
        continue;
    }
    if( mymod === 6 ) {
		answer = line;
        params.push(answer.replace('\r',''));
		//console.log(params);
		retRows.push(params);
		linenum++;
        continue;
    }


    
};

console.log('end of myinline reader reached');
return retRows;
} //end of myline reader function
