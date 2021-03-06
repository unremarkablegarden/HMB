var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
 var Unterlagen = new keystone.List('Unterlagen', {
 	map: { name: 'title' },
 	label: 'Unterlagen',
 	plural: 'Unterlagen',
 	autokey: { path: 'slug', from: 'title', unique: true },
 	defaultSort: 'type',
 });

 Unterlagen.add({
 	title: { type: String, required: true, index: true, initial: true },
  number: { type: Types.Number, label: 'Antrag Nr.' },
 	type: { type: Types.Select, options: 'resolutionen, referenzen, downloads, informationen', default: 'resolutionen', initial: true, index: true },
  textNumbered: { type: Types.Code, language: 'html', label: 'Text with numbered lines', dependsOn: { type: 'resolutionen' } },
  text: { type: Types.Html, wysiwyg: true, label: 'Info' },
  date: { type: Types.Date, default: Date.now, dependsOn: { type: 'resolutionen' } },
  pdf: { type: Types.Url, label: 'Google Docs embed URL', dependsOn: { type: 'resolutionen' } },
  download: { type: Types.Url, label: '(or) Download URL', dependsOn: { type: 'downloads' } },

 });

 /**
  * Registration
  */
 Unterlagen.defaultColumns = 'title,type|15%,number|15%';
 Unterlagen.register();
