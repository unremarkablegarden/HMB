var keystone = require('keystone');

var selectList = 'Veranstaltungen';
var 							Veranstaltungen = keystone.list(selectList);
// var 											Akteure = keystone.list('Akteure');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
			locals.section = selectList.toLowerCase();
			locals.title = selectList;
			locals.data = { results: [] };
			locals.event = res.locals.event;

	view.on('init', function(next) {


		Veranstaltungen.model.find()
			// .sort('type')
			.sort({type: 1, title: 1})
			.populate('akteure')
			.populate('location')
			.exec(function(err, result) {
				locals.data.results = result;
				// console.log(locals.data.results);
				next(err);
			});

	});

	view.render(locals.section);
};
