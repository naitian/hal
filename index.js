'use strict';
const login = require('facebook-chat-api');
const fs = require('fs');
const prompt = require('prompt');
const Bot = require('botjs2');
const shlight = require('./shlight.js');
const tasks = require('./tasks.js');
const hackernews = require('./news.js');

function task (botAPI) {
  botAPI.getThreadData('tasks', (err, info) => {
    if (err) {
      console.log(err);
      // if (err === 'Key does not exist') {
      //   tasks.setList([]);
      //   botAPI.setThreadData('tasks', tasks.tasksList, (err) => {
      //     if (err) {
      //       botAPI.sendMessage('Oh no, something went wrong...');
      //       console.log(err);
      //       return;
      //     }
      //   });
      // }
      // else 
        // return;
    }
    tasks.setList(info);
    switch (botAPI.args[0]) {
      case 'add':
        tasks.createTask(botAPI.args[1]);
        botAPI.setThreadData('tasks', tasks.tasksList, (err) => {
          if (err) {
            botAPI.sendMessage('Oh no, something went wrong...');
            console.log(err);
            return;
          } else {
            botAPI.sendMessage(`${botAPI.args[1]} was added to tasks`);
          }
        });
        break;
      case 'edit':
        tasks.updateTask(botAPI.args[1], botAPI.args[2]);
        botAPI.setThreadData('tasks', tasks.tasksList, (err) => {
          if (err) {
            botAPI.sendMessage('Oh no, something went wrong...');
            console.log(err);
            return;
          } else {
            botAPI.sendMessage(`Task revised to ${botAPI.args[2]}`);
          }
        });
        break;
      case 'del':
        tasks.deleteTask(botAPI.args[1]);
        botAPI.setThreadData('tasks', tasks.tasksList, (err) => {
          if (err) {
            botAPI.sendMessage('Oh no, something went wrong...');
            console.log(err);
            return;
          } else {
            botAPI.sendMessage(`Task ${botAPI.args[1]} was deleted.`);
          }
        });
        break;
      case 'list':
        botAPI.sendMessage(tasks.readTasks());
        break;
    }
  });
  
}

function news (botAPI) {
  console.log(botAPI.args[0]);
  hackernews.retrieveNewsArticles(botAPI.args[0], (links) => {
    let output = '';
    for (let link of links) {
      output += link.title + '\n\t' + link.href + '\n';
    }

    botAPI.sendMessage(output);
  });
}

function authenticate(credentials){
  login(credentials, function(err, api) {
    if(err) return console.trace(err);

    if(credentials.email)
      fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

    console.log('Logged in'); //we've authenticated

    const Hal = new Bot('Hal the Dev Cyborg', api);
    Hal
      .command('!task', task, `!task add <task>
        !task edit <index> <new>
        !task del <index>
        !task list`)
      .command('!news', news, `!news <amount (min 5, max 30)>`);
  });
}

try {
  authenticate({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))});
}
catch (err) {
  console.log('Enter your Facebook credentials - ' + 
  'your password will not be visible as you type it in');
  prompt.start();
  prompt.get([{
    name: 'email',
    required: true
  }, {
    name: 'password',
      hidden: true,//so we don't see the user's password when they type it in
      conform: function () {
        return true;
      }
    }], function (err, result) {
      authenticate(result); //pass credentials to authenticate function
    }
  );
}