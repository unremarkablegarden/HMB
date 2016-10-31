var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Homepage = new keystone.List('Homepage', {
	map: { name: 'title' },
	label: 'Homepage',
	plural: 'Homepage',
	autokey: { path: 'slug', from: 'title', unique: true },
	nocreate: true,
	nodelete: true,
});

Homepage.add({
	title: { type: String, required: true, index: true, initial: true, label: 'Titel'},
	subtitle: { type: String, initial: true, label: 'Untertitel' },
	image: { type: Types.CloudinaryImage },
});

/**
 * Registration
 */
Homepage.defaultColumns = 'title|25%, subtitle';
Homepage.register();
