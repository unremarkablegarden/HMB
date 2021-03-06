var keystone = require('keystone');

var selectList = 'Media';
var 							Media = keystone.list(selectList);

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.title = selectList;
			locals.data = { results: [] };
			locals.event = res.locals.event;

	view.on('init', function(next) {

		Media.model.find()
			.sort('type')
			.exec(function(err, result) {
				locals.data.results = result;
				next(err);
			});

	});

	view.render(locals.section);
};
