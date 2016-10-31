var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Media = new keystone.List('Media', {
	map: { name: 'title' },
	label: 'Media',
	plural: 'Media',
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: 'type',
});

Media.add({
	title: { type: String, required: true, index: true, initial: true },
	type: { type: Types.Select, options: 'photos, video', default: 'photos', index: true, initial: true, required: true },
	heroImage: { type: Types.CloudinaryImage, dependsOn: { type: 'photos' } },
	images: { type: Types.CloudinaryImages, dependsOn: { type: 'photos' } },
	vimeoUrl: { type: Types.Url, dependsOn: { type: 'video' }, label: 'Vimeo URL'  }
});

/**
 * Registration
 */
Media.defaultColumns = 'title, type, heroImage';
Media.register();
