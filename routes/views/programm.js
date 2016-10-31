var keystone = require('keystone');

var selectList = 'Programm';
var 							Programm = keystone.list(selectList);

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.title = selectList;
			locals.data = { results: [] };

	view.on('init', function(next) {

		Programm.model.find()
			.sort({date: 1, start: 1})
			.exec(function(err, result) {
				locals.data.results = result;
				next(err);
			});

	});

	view.render(locals.section);
};
