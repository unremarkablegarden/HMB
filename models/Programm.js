var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Programm = new keystone.List('Programm', {
	map: { name: 'title' },
	label: 'Programm',
	plural: 'Programm',
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: 'createdAt',
});

var key = Programm.key;
var date;

Programm.add({
	title: { type: String, required: true, index: true, initial: true, label: 'Programmpunkt' },
	createdAt: { type: Date, default: Date.now, hidden: true },
	content: { type: Types.Html, wysiwyg: true, height: 150, label: 'Mehr text' },
	date: { type: Types.Date, initial: true, label: 'Datum', default: Date.now },
	start: { type: String, default: '12.00', initial: true, label: 'Startzeit'},
	end: { type: String, default: '13.00', initial: true, label: 'Endzeit' },
	akteure: { type: Types.Relationship, ref: 'Akteure', many: true, label: 'Leitung' },
	// start: { type: Types.Datetime, default: Date.now, format: 'HH:MM' },
	// end: { type: Types.Datetime, default: Date.now, format: 'HH:MM' },
	// akteure: { type: Types.Relationship, ref: 'Akteure', many: true },
});

/**
 * Registration
 */
// Akteure.defaultColumns = 'name, image|20%';
Programm.defaultColumns = 'title|60%, date|20%, start|10%, end|10%';
Programm.register();
