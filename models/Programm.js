var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Programm = new keystone.List('Programm');

Programm.add({
	title: { type: String, required: true, index: true, initial: true },
});

/**
 * Registration
 */
// Akteure.defaultColumns = 'name, image|20%';
Programm.defaultColumns = 'name';
Programm.register();
