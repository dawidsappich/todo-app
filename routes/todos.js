const express = require('express');
const router = express.Router();
const DB = require('../models');

router.get('/', (req, res) => {
	DB.Todo.find()
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.send(err)
		})
});


router.post('/', (req, res) => {
	DB.Todo.create(req.body)
		.then(newTodo => res.status(201).json({ success: true, message: newTodo }))
		.catch(err => res.json({ success: false, message: err }))
})


router.get('/:todosId', (req, res) => {
	DB.Todo.findById(req.params.todosId)
		.then(todo => res.json({ success: true, message: todo }))
		.catch(err => res.json({ success: false, message: err }))
})


router.put('/:todosId', (req, res) => {
	DB.Todo.findByIdAndUpdate(req.params.todosId, req.body, { new: true })
		.then(todo => res.json({ success: true, message: todo }))
		.catch(err => res.json({ success: false, message: err }))
})

router.delete('/:todosId', (req, res) => {
	DB.Todo.findByIdAndRemove(req.params.todosId)
		.then(todo => res.json({ success: true, message: todo }))
		.catch(err => res.json({ success: false, message: err }))
})

module.exports = router;