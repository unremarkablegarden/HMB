var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Homepage = new keystone.List('Homepage');

Homepage.add({
	title: { type: String, required: true, indeHomepage: true, initial: true },
});

/**
 * Registration
 */
Homepage.defaultColumns = 'title';
Homepage.register();
