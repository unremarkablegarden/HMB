var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Akteure = new keystone.List('Akteure', {
	map: { name: 'name' },
	label: 'Akteure',
	plural: 'Akteure',
	autokey: { path: 'slug', from: 'name', unique: false },
	slug: { path: 'slug', from: 'name', unique: true },
	defaultSort: 'lastname',
});

Akteure.add({
	name: { type: String, required: true, index: true, initial: true },
	bio: { type: Types.Html, wysiwyg: true, height: 150 },
	image: { type: Types.CloudinaryImage },
	lastName: { type: String, required: true, initial: false, label: 'Last name (for sorting)' }
});

/**
 * Relationships
 */
Akteure.relationship({ ref: 'Programm', path: 'akteure', refPath: 'akteure' });

/**
 * Registration
 */
Akteure.defaultColumns = 'name, image|20%';
Akteure.register();
