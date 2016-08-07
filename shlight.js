"use strict";

var hl = require("highlight").Highlight;
var wkhtmltox = require("wkhtmltox");
var fs = require("fs");
var Readable = require("stream").Readable;

var cssPath = __dirname+ "/node_modules/highlight/lib/vendor/highlight.js/styles/sunburst.css";


module.exports = {
    getSyntaxImage: function(codeText){
        var html = hl(codeText);
        var htmlStng = "<link rel='stylesheet' href='" + cssPath+ "'/>" + "<pre>" + html + "</pre>";

        var converter = new wkhtmltox();

        converter.wkhtmltoimage = 'wkhtmltox/bin/wkhtmltoimage';

        var s = new Readable();
        s.push(htmlStng);
        s.push(null);

        return converter.image(s, { format: "jpg" });
    }
}