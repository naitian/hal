//i have no idea what im doing, ~Andrew Shi MLH Prime Spring 2016

"use strict";
var request = require("request");

module.exports = {
	cb2: function(files){
		console.log(files);
	},
	commitinfo: function(name, date, repo, authx, cb){ //sends back commit info
		var options = {
			url:`https://api.github.com/repos/${name}/${repo}/commits?access_token=${authx}`,
			headers:{'User-Agent':name}
		};

		request(options, function(error, response, body){
			if(!error && response.statusCode == 200){
				body = JSON.parse(body);

				var info = []; //array to be returned
				for(let x of body){
					var commit = {};
					if(new Date(x.commit.author.date).getTime() < new Date(date).getTime()){
						break;
					}

					commit.name = x.commit.author.name;
					commit.date = x.commit.author.date;
					commit.message = x.commit.message;
					commit.url = x.html_url;

					request({url:x.url,headers:{'User-Agent':name}}, function(error, response, body){ //get files changed in each commit. increases api calls.
						if(!error && response.statusCode == 200){
							cb2(JSON.parse(body).files);
						}	
					}

					// console.log(x.url);
					commit.changes = function(function(cb2)){
						function(cb2){
							request({url:x.url,headers:{'User-Agent':name}}, function(error, response, body){ //get files changed in each commit. increases api calls.
							if(!error && response.statusCode == 200){
								cb2(JSON.parse(body).files);
							}							
						}

						return changeJSON;
					});
					}
					
					info.push(commit);
				}
				console.log(info);
				cb(info);
			}			
		});
	}
}