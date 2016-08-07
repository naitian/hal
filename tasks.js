'use strict';

const tasksList = [];

module.exports = {
	//Create
	createTask: function(task){
		tasksList.push(task);
	},
	//Read
	readTasks: function(){
		let output = "";
		for(let cnt = 0; cnt < tasksList.length; cnt++){
			output += (Array(tasksList.length.toString().length).join("0") + cnt).slice(-tasksList.length.toString().length) +
				" : " +
				tasksList[cnt] + 
				"\n";
		}
		return output;
	},
	//Update
	updateTask: function(taskIndex, updatedTask){
		tasksList[taskIndex] = updatedTask;
	},
	//Delete
	deleteTask: function(taskIndex){
		tasksList.splice(taskIndex, 1);
	}
}