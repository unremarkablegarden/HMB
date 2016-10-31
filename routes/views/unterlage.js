var keystone = require('keystone');

var selectList = 'Unterlagen';
var 							Unterlagen = keystone.list(selectList);
// var 											Akteure = keystone.list('Akteure');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.data = { results: [] };
			locals.filters = {
				unterlage: req.params.unterlage,
			};


	view.on('init', function(next) {

		var q = keystone.list(selectList).model.findOne({
			slug: locals.filters.unterlage
		});

		q.exec(function (err, result) {
			locals.data.unterlage = result;
			next(err);
		});

	});

	view.render('unterlage');
};
