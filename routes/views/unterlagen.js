var keystone = require('keystone');

var selectList = 'Unterlagen';
var 							Unterlagen = keystone.list(selectList);
// var 											Akteure = keystone.list('Akteure');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.title = selectList;
			locals.data = { results: [] };

	view.on('init', function(next) {

		Unterlagen.model.find()
			.sort('type')
			// .populate('akteure')
			.exec(function(err, result) {
				locals.data.results = result;
				// console.log(locals.data.results);
				next(err);
			});

	});

	view.render(locals.section);
};
