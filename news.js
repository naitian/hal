'use strict';

var cheerio = require('cheerio');
var request = require('request');

// const links = [];
// const titles = [];

let links = [];

module.exports = {
	retrieveNewsArticles: function(num, cb){
		links = [];
		num = num || 5;
		if (num > 30) num = 30;
		request('https://news.ycombinator.com/', function(error, response, body){
			if(!error && response.statusCode === 200){
				const $  = cheerio.load(body);
				const anchors = $('.title a');
				for(let cnt = 0; cnt < Math.min(num, anchors.length) * 2; cnt += 2){
					links.push({'title': anchors[cnt].children[0].data,
						'href':anchors[cnt].attribs.href});
				}
				// console.log(links);
				// for(let cnt = 0; cnt < links.length; cnt++){
				// 	console.log(cnt);
				// 	console.log(links[cnt]['title'] + '\n' + links[cnt]['href'] + '\n\n');
				// }
				// console.log(done)
				cb(links);
			}
		});
	}
};