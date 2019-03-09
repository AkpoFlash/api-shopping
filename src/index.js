const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendStatus(200);
});

// get all books
app.get('/books', (req, res) => {
	db.get()
		.collection('books')
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
	db.get()
		.collection('books')
		.findOne({ _id: ObjectId(req.params.id) }, (err, book) => {
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

	db.get()
		.collection('books')
		.insertOne(book, (err, result) => {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}
		});

	res.sendStatus(200);
});

// update book
app.put('/books/:id', (req, res) => {
	db.get()
		.collection('books')
		.updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: req.body.name } }, (err, book) => {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		});
});

// delete book
app.delete('/books/:id', (req, res) => {
	db.get()
		.collection('books')
		.deleteOne({ _id: ObjectId(req.params.id) }, (err, book) => {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		});
});

db.connect('mongodb://localhost:27017/api', (err, database) => {
	if (err) {
		return console.error(err);
	}
	app.listen(3012, () => {
		console.log('API start');
	});
});
