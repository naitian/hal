var tasks = require("./tasks.js");
tasks.createTask("Add settings button");
tasks.createTask("Add map button");
tasks.createTask("Add audio button");
tasks.createTask("Add pause button");
tasks.createTask("Add skip forward button");
tasks.createTask("Add skip backward button");
tasks.createTask("Add zone dropdown");
tasks.createTask("Add gallery");
tasks.createTask("Add about");
tasks.createTask("Add zone border");
tasks.createTask("Add settings fragment");
console.log(tasks.readTasks());
tasks.updateTask(9, "Add zone on map");
console.log(tasks.readTasks());
tasks.deleteTask(9);
console.log(tasks.readTasks());

var news = require("./news.js");
news.retrieveNewsArticles(5, function(links){
	console.log(links);
});
//console.log("OMFG KMN" + links);