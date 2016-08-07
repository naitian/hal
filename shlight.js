var hl = require("highlight").Highlight;
var wkhtmltox = require("wkhtmltox");
var fs = require("fs");
var Readable = require("stream").Readable;

var cssPath = __dirname+ "/node_modules/highlight/lib/vendor/highlight.js/styles/sunburst.css";
var codeText =  "for(var i=0; i<10; i++)alert(i);"

var html = hl(codeText);
var htmlStng = "<link rel='stylesheet' href='" + cssPath+ "'/>" + "<pre>" + html + "</pre>";


var converter = new wkhtmltox();

converter.wkhtmltoimage = 'wkhtmltox/bin/wkhtmltoimage';

var s = new Readable();
s.push(htmlStng);
s.push(null);


converter.image(s, { format: "jpg" })
    .pipe(fs.createWriteStream("foo.jpg"))
    .on("finish", function(){
        console.log("done");
    });
