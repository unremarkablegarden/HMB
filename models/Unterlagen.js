var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Unterlagen = new keystone.List('Unterlagen');

Unterlagen.add({
	title: { type: String, required: true, indeUnterlagen: true, initial: true },
});

/**
 * Registration
 */
Unterlagen.defaultColumns = 'title';
Unterlagen.register();
