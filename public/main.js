$(document).ready(() => {

	$.getJSON('/api/todos')
		.then(loadAllTodos);

	$('#todoInput').keypress(event => {
		// keycode for enter is 13
		if (event.which === 13) {
			createTodo(event.target);
		}
	});

	$('.list').on('click', 'li', function () {
		updateTodo($(this));
	})

	$('.list').on('click', 'span', function (event) {
		event.stopPropagation();
		removeTodo($(this).parent());
	})

});

function updateTodo(todo) {
	let isDone = todo.data('completed');
	let payload = { completed: !isDone };
	// set status in database
	$.ajax({
		method: 'PUT',
		url: `/api/todos/${todo.data('id')}`,
		data: payload
	})
		.then(res => {
			todo.toggleClass('completed');
			todo.data('completed', !isDone);
		})
}

function removeTodo(todo) {
	let todoId = todo.data('id');
	$.ajax({
		method: 'DELETE',
		url: `/api/todos/${todoId}`
	})
		.then(res => {
			todo.remove();
		});
}

function loadAllTodos(todos) {
	todos.forEach(todo => {
		addTodo(todo);
	});
}

function addTodo(todo) {
	let newTodo = $(`<li class="task">${todo.name}<span>x</span></li>`);
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed) newTodo.addClass('completed');
	$('.list').append(newTodo);
}


function createTodo(eventTarget) {
	// send post Request to create todo
	$.post('/api/todos', { name: eventTarget.value })
		.then(res => {
			$('#todoInput').val('');
			addTodo(res.message);
		})
}