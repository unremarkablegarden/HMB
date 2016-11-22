require('dotenv').config();

// Require keystone
var keystone = require('keystone');

keystone.init({
	'name': 'Hartmannbund',
	'brand': 'Hartmannbund',

	// 'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'adminui custom styles': 'customAdmin/index.less',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	redaktionssystem: [
		'Homepage',
		'Programm',
		'Locations',
		'Akteure',
		'Veranstaltungen',
		'Unterlagen',
		'Media',
	],
	system: 'users',
	// testing: ['posts', 'post-categories', 'galleries'],
});

keystone.set('mongo', 'mongodb://localhost/hartmannbund2')

// keystone.set('port', 80);

// Start Keystone to connect to your database and initialise the web server
keystone.start();
