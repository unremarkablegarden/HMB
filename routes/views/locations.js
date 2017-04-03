var keystone = require('keystone');

var selectList = 'Locations';
var 							Locations = keystone.list(selectList);

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.title = selectList;
			locals.data = { results: [] };
			locals.event = res.locals.event;

	view.on('init', function(next) {

		Locations.model.find()
			.sort({ 'sort': 1, 'name': 1 })
			.exec(function(err, result) {
				locals.data.results = result;
				// console.log(locals.data.results);
				next(err);
			});

	});

	view.render(locals.section);
};
