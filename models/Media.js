var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Media = new keystone.List('Media');

Media.add({
	title: { type: String, required: true, indeMedia: true, initial: true },
});

/**
 * Registration
 */
Media.defaultColumns = 'title';
Media.register();
