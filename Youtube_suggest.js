//This program helps to retreive youtube suggests when keywords are given
var request = require('request');   //Request module is designed to be the simplest way possible to make http calls. 
var args=process.argv.slice(2);     //process.argv to pass the arguments via command line and slice(2) to skip first two arguments(i.e,node and filename)
var input=args.join(' ');           //Joining the arguments with spaces
var url="https://clients1.google.com/complete/search?client=youtube&hl=en&gl=in&gs_rn=23&gs_ri=youtube&tok=xuezBMleoQLATHzi7RgAkQ&ds=yt&cp=5&gs_id=k&q=query&callback=google.sbox.p50&gs_gbg=XFGj5"; //url obatained from the developers tools which contains the suggests we are going to extract
url=url.replace('query',input);  //replacing the query part of the url with our input i.e., keywords  
//console.log(url);   
request(url, function (error, response, body) {  //Redirects the information obatined from url to body
//console.log(body);
var a="'"+body+"'";             //Converting text to string by adding a '(beginning and ending) so as to manipulate it easily
//console.log(a);
a=a.replace(/google.sbox.p50 && google.sbox.p50/g, ""); //Removing the content by using replace function
//a=a.replace(/[0-9\.]+/g, "");
a=a.replace(/\[/g,"");       //Removing  '['
a=a.replace(/\]/g,"");       //Removing ']'
a=a.split("{")[0];           //Removing the content beginning with '{' and returning the content before '{'
a=a.replace(/\(/g,"");       //Removing '\'
a=a.replace(/,/g,"");        //Removing command
a=a.replace(/"/g,"\n");      //Replacing every " with new line character
a=a.replace(/'/g,'');        //Removing extra '
if(/^\d.*/.test(input)){     //checking if the input begins with a digit
a=a.replace(/^0\s/mg,'');
a=a.replace(/0$/mg,'');
}
else{
a=a.replace(/^[0-9]+/mg,'');  }   //Removing the lines beginning with numbers
a=a.replace(/^\s*\n/gm,'');  //Removing blank lines
console.log(a);                 //Print the formatted output
});