const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;
const mongos: any = mongoose.connection;

mongos.on('error', function (err: any) {
	console.log('Connection error:', err.message);
});

mongos.once('open', function callback() {
	console.log("Connected to DB!");
});

const basename = path.basename(module.filename);
const db: any = {};

fs
	.readdirSync(__dirname)
	.filter(function (file: any) {
		return (file.indexOf('.') !== 0) && (file !== basename);
	})
	.forEach(function (file: any) {
		if (file.slice(-3) !== '.js') return;
		let model = require(`./${file}`)(mongoose);
		db[model.modelName] = model;
	});
module.exports = db;