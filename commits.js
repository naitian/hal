//i have no idea what im doing, ~Andrew Shi MLH Prime Spring 2016

"use strict";
var request = require("request");

function filechanges(name, url, cb2){
	var options = {
		url:url,
		headers:{'User-Agent':name}
	};

	request(options, function(error, response, body){ //get files changed in each commit. increases api calls.
		if(!error && response.statusCode == 200){
			var files = [];
			for(let x of JSON.parse(body).files){
				// console.log(x);
				var fileinfo = {};
				fileinfo.name = x.filename;
				fileinfo.status = x.status;
				fileinfo.url = x.raw_url;
				fileinfo.add = x.additions;
				fileinfo.del = x.deletions;
				fileinfo.changes = x.changes;
				// console.log(fileinfo);
				files.push(fileinfo);
			}
			// console.log(files);
			cb2(files);
		}
	});
}

module.exports = {
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
					// console.log(x.url);
					filechanges(name, `${x.url}?access_token=${authx}`, function(changesJSON){
						commit.name = x.commit.author.name;
						commit.date = x.commit.author.date;
						commit.message = x.commit.message;
						commit.url = x.html_url;
						commit.changes = changesJSON;
						// console.log(changesJSON);
						// console.log(commit);
						info.push(commit);
						cb(info);
					});
					
				}
				// console.log(info);
			}			
		});
	}
}