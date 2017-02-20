var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Locations = new keystone.List('Locations', {
	map: { name: 'name' },
	label: 'Location',
	plural: 'Locations',
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: 'type',
});

Locations.add({
	name: { type: String, required: true, index: true, initial: true, label: 'Location name' },
	// type: { type: Types.Select, options: 'main, outside, room', default: 'main', index: true },
	info: { type: Types.Html, wysiwyg: true, label: 'Info' },
	link: { type: Types.Url, label: 'Google Maps link' },
	map: { type: Types.CloudinaryImage, label: 'Map image' },
});

/**
 * Registration
 */
Locations.defaultColumns = 'name|80%,type|20%';
Locations.register();
