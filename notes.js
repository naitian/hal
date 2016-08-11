'use strict';

module.exports = {
	setNote: (botAPI, event) => {
		// console.log('called');
		let users = botAPI.getUserByName(botAPI.args[0]);
		if (users.length < 1) {
			botAPI.sendMessage('There is no user by that name. Make sure you spelled it gud.');
			return;
		}
		let uid = users[0].id;
		console.log(uid);
		if (users.length > 1) {
			botAPI.sendMessage('There is more than one user by that name. Please be more specific');
			return;
		}

		let note = {
			message: botAPI.args[1],
			from: event.senderID,
			timestamp: (new Date()).toJSON()
		};
			

		botAPI.getUserData(uid, 'notes', (err, val) => {
			if (err && err !== 'User does not exist') {
				console.trace(err);
				return;
			}
			if (val) {
				val.push(note);
			} else {
				val = [note];
			}

			botAPI.setUserData(uid, 'notes', val, (err) => {
				if (err) {
					console.trace(err);
					botAPI.sendMessage('Oops, an error occurred!');
					return;
				}
				botAPI.sendMessage(`Cool. Note set for ${JSON.parse(botAPI.thread.users[uid]).name}`);
			});
		});
	},

	checkNotes: (botAPI, event) => {
		let uid = event.senderID;
		botAPI.getUserData(uid, 'notes', (err, val) => {
			if (err && err !== 'User does not exist') {
				console.trace(err);
				return;
			}
			if (val && val.length > 0) {
				let notesList = `Hey ${JSON.parse(botAPI.thread.users[uid]).firstName}!
Here are some notes for you:
`;
				while (val.length > 0) {
					let note = val.shift();
					notesList += `	"${note.message}" ~ ${JSON.parse(botAPI.thread.users[note.from]).name}
					`;
				}
				botAPI.sendMessage(notesList);
				botAPI.setUserData(uid, 'notes', val);
			}
		});
	}
};