const mongoose = require('mongoose');
mongoose.set('debug', true);
// connect to mongodb
mongoose.connect('mongodb://client:Vs8vR5Q5TyLY@localhost/todoapp', { useMongoClient: true });
// use native Promise implementation
mongoose.Promise = global.Promise;

module.exports.Todo = require('./todo');