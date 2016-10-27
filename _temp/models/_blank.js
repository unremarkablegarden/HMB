var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var X = new keystone.List('X');

X.add({
	title: { type: String, required: true, index: true, initial: true },
});

/**
 * Registration
 */
X.defaultColumns = 'name';
X.register();
