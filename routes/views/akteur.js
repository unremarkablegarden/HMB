var keystone = require('keystone');

var selectList = 'Akteure';
var 							Akteure = keystone.list(selectList);
// var 											Akteure = keystone.list('Akteure');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.data = { results: [] };
			locals.filters = {
				akteur: req.params.akteur,
			};


	view.on('init', function(next) {

		var q = keystone.list(selectList).model.findOne({
			slug: locals.filters.akteur
		});

		q.exec(function (err, result) {
			locals.data.akteur = result;
			next(err);
		});

	});

	view.render('akteur');
};
