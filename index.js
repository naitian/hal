'use strict';
const login = require('facebook-chat-api');
const fs = require('fs');
const prompt = require('prompt');
const Bot = require('botjs2');
const shlight = require('./shlight.js');

function highlight (botAPI) {
  let msg = {
    body: 'Your code, pretty:',
    attachment: shlight.getSyntaxImage(botAPI.args[0])
  };
  botAPI.sendMessage(msg);
}

function authenticate(credentials){
  login(credentials, function(err, api) {
    if(err) return console.trace(err);

    if(credentials.email)
      fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

    console.log('Logged in'); //we've authenticated

    const Hal = new Bot('Hal the Dev Cyborg', api);
    Hal
      .command('!hl', highlight, '!hl <code>');
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