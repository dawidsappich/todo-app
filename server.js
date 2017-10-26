const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// logging framework
const morgan = require('morgan');
const PORT = 5489;

// load routes configurations
const todoRoutes = require('./routes/todos');

// use morgan for logging in development modus
app.use(morgan('dev'));
// serve static files from public folder
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/todos', todoRoutes);


// listen port to incoming requests
app.listen(PORT, () => {
	console.log(`express listening on port ${PORT}`);
})