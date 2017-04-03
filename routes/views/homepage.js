var keystone = require('keystone');

var selectList = 'Homepage';
var 							Homepage = keystone.list(selectList);

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.title = 'Hartmannbund';
			locals.data = { results: [] };
			locals.event = res.locals.event;

	view.on('init', function(next) {
		Homepage.model.find().exec(function(err, result) {
			locals.data.results = result;
			// console.log(result)
			next(err);
		});
	});

	view.render(locals.section);

};
