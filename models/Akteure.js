var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Akteure = new keystone.List('Akteure');

Akteure.add({
	name: { type: String, required: true, index: true, initial: true },
	bio: { type: Types.Html, wysiwyg: true, height: 150 },
	image: { type: Types.CloudinaryImage },
});

/**
 * Relationships
 */
// Akteure.relationship({ ref: 'Programm', path: 'akteure', refPath: 'akteure' });

/**
 * Registration
 */
Akteure.defaultColumns = 'name, image|20%';
Akteure.register();
