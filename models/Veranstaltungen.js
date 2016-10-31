var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Veranstaltungen = new keystone.List('Veranstaltungen', {
	map: { name: 'title' },
	label: 'Veranstaltungen',
	plural: 'Veranstaltungen',
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: 'type',
});

Veranstaltungen.add({
	title: { type: String, required: true, index: true, initial: true },
	type: { type: Types.Select, options: 'workshop, other', default: 'workshop', initial: true, index: true },
	typeOther: { type: String, dependsOn: { type: 'other' } },
	info: { type: Types.Html, wysiwyg: true, label: 'Info' },
	Location: { type: Types.Relationship, ref: 'Locations', many: false, label: 'Location', dependsOn: { type: 'workshop' } },
	akteure: { type: Types.Relationship, ref: 'Akteure', many: true, label: 'Leitung' },
	date: { type: Types.Date, label: 'Datum', default: Date.now, dependsOn: { type: 'workshop' }  },
	start: { type: String, default: '12.00', label: 'Startzeit', dependsOn: { type: 'workshop' }},
	end: { type: String, default: '13.00', label: 'Endzeit', dependsOn: { type: 'workshop' } },

});

/**
 * Registration
 */
Veranstaltungen.defaultColumns = 'title,type|15%,date|20%';
Veranstaltungen.register();
