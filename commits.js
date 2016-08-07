//i have no idea what im doing, ~Andrew Shi MLH Prime Spring 2016

"use strict";
var request = require("request");

module.exports = {
	commitinfo: function(name, date, repo, authkey){ //sends back commit info
		request("https://api.github.com/repos/`${name}/`${repo}/commits?access_token=`$(authkey}", function(error, response, body){
			if(error){
				return {error:true};
			}
			if(response !== 200){
				return {error:true};
			}

			var info = {}; //JSON to be returned
			for(var key in body){
				if(new Date(body[key].commit.author.date).getTime() < new Date(date).getTime()){
					break;
				}
				info.name = body[key].commit.author.name;
				info.date = body[key].commit.author.date;
				info.message = body[key].commit.message;
				info.url = body[key].html_url;
			}
			return info;
		});
	}
}