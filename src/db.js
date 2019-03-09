const MongoClient = require('mongodb').MongoClient;

const state = { db: null };

exports.connect = (url, cb) => {
	if (state.db) {
		return cb();
	}

	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) {
			return cb(err);
		}
		state.db = db.db('api');
		cb();
	});
};

exports.get = () => state.db;
