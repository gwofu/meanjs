'use strict';

module.exports = {
	db: 'mongodb://localhost/mean-dev',
	//db: 'mongodb://gwofu:88888888@oceanic.mongohq.com:10063/xindong',

	app: {
		title: '-`♥´- development'
	},
	facebook: {
		clientID: '240618009471705',
		clientSecret: 'd74445e4d155c7850ec743d327ab33cb',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: 'CONSUMER_KEY',
		clientSecret: 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};