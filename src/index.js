const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('API');
});

// get all books
app.get('/books', (req, res) => {
	db.collection('books')
		.find()
		.toArray((err, docs) => {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}
			res.send(docs);
		});
});

// get book by id
app.get('/books/:id', (req, res) => {
	db.collection('books').findOne({ _id: ObjectId(req.params.id) }, (err, book) => {
		if (err) {
			console.error(err);
			return res.sendStatus(500);
		}
		res.send(book);
	});
});

// add new book
app.post('/books', (req, res) => {
	const book = {
		name: req.body.name,
	};

	db.collection('books').insertOne(book, (err, result) => {
		if (err) {
			console.error(err);
			return res.sendStatus(500);
		}
	});

	res.sendStatus(200);
});

// update book
app.put('/books/:id', (req, res) => {
	db.collection('books').updateOne(
		{ _id: ObjectId(req.params.id) },
		{ $set: { name: req.body.name } },
		(err, book) => {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		}
	);
});

// delete book
app.delete('/books/:id', (req, res) => {
	db.collection('books').deleteOne({ _id: ObjectId(req.params.id) }, (err, book) => {
		if (err) {
			console.error(err);
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	});
});

MongoClient.connect('mongodb://localhost:27017/api', { useNewUrlParser: true }, (err, database) => {
	if (err) {
		return console.error(err);
	}
	db = database.db('api');
	app.listen(3012, () => {
		console.log('API start');
	});
});
