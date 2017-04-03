var keystone = require('keystone');

var selectList = 'Akteure';
var 							Akteure = keystone.list(selectList);

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.title = selectList;
			locals.data = { results: [] };
			locals.event = res.locals.event;

	view.on('init', function(next) {
		Akteure.model.find()
									.sort('lastName')
									.exec(function(err, result) {
			locals.data.results = result;
			// console.log(result)
			next(err);
		});
	});

	// locals.section = name of the view and List in lowercase
	// render = templates/views/XXX.jade

	// 500: Failed to lookup view "akteure" in views directory
	// 			= the TEMPLATE views directory !!!

	view.render(locals.section);

};
