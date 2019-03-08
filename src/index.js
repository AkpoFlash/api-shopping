const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mock for db
let books = [
	{
		id: 1,
		name: 'Война и мир',
	},
	{
		id: 2,
		name: 'Тихий Дон',
	},
	{
		id: 3,
		name: 'Сумерки',
	},
];

app.get('/', (req, res) => {
	res.send('API');
});

// get all books
app.get('/books', (req, res) => {
	res.send(books);
});

// get book by id
app.get('/books/:id', (req, res) => {
	const book = books.find(book => book.id === +req.params.id);
	res.send(book);
});

// add new book
app.post('/books', (req, res) => {
	const book = {
		id: Date.now(),
		name: req.body.name,
	};
	books.push(book);
	res.sendStatus(200);
});

// update book
app.post('/books/:id', (req, res) => {
	const book = books.find(book => book.id === +req.params.id);
	book.name = req.body.name;
	res.sendStatus(200);
});

// delete book
app.delete('/books/:id', (req, res) => {
	books = books.filter(book => book.id !== +req.params.id);
	res.sendStatus(200);
});

app.listen(3012, () => {
	console.log('API start');
});
