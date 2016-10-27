var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Locations = new keystone.List('Locations');

Locations.add({
	title: { type: String, required: true, indeLocations: true, initial: true },
});

/**
 * Registration
 */
Locations.defaultColumns = 'title';
Locations.register();
