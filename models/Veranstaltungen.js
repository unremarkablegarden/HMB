var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Veranstaltungen = new keystone.List('Veranstaltungen');

Veranstaltungen.add({
	title: { type: String, required: true, indeVeranstaltungen: true, initial: true },
});

/**
 * Registration
 */
Veranstaltungen.defaultColumns = 'title';
Veranstaltungen.register();
